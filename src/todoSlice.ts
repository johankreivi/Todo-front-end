import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, getTodoCount, createTodo } from "./services/todoServices";
import { Todo } from "./components/models/Todo";
import { message } from "antd";

interface TodoState {
  data: Todo[];
  totalItems: number;
  defaultPageSize: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  data: [],
  totalItems: 0,
  defaultPageSize: 50,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (params: { page: number; pageSize: number }) => {
  const data = await getTodos(params.page, params.pageSize);
  const totalItems = await getTodoCount();
  return { data, totalItems };
});

export const createNewTodo = createAsyncThunk(
  'todos/createNewTodo',
  async (params: { todo: Todo, page: number, pageSize: number }, thunkAPI) => {
    try {
      const newTodo = await createTodo(params.todo);
      message.success('Todo created successfully!');
      
      await thunkAPI.dispatch(fetchTodos({ page: params.page, pageSize: params.pageSize }));
      
    } catch (error) {
      message.error('Failed to create todo.');
      return thunkAPI.rejectWithValue(error);
    }});



const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDefaultPageSize: (state, action: PayloadAction<number>) => {
      state.defaultPageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<{ data: Todo[]; totalItems: number }>) => {
        state.data = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setCurrentPage, setDefaultPageSize } = todoSlice.actions;

export default todoSlice.reducer;