import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, getTodoCount, createTodo, flipTodoStatus, editTodo, deleteTodoById } from "./services/todoServices";
import { Todo } from "./components/models/Todo";
import { message } from "antd";

interface TodoState {
  data: Todo[];
  totalItems: number;
  defaultPageSize: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  filter? : string;
}

const initialState: TodoState = {
  data: [],
  totalItems: 0,
  defaultPageSize: 50,
  currentPage: 1,
  loading: false,
  error: null,
  filter: 'all'
};


    

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (params: { page: number; pageSize: number; filter? : string }) => {

  console.log('params', params);

  if (params.filter === 'completed') {
    const data = await getTodos(params.page, params.pageSize);
    const result = data.filter((item : any) => item.completed);
    return { data: result, totalItems: result.length };
  }
  if (params.filter === 'uncompleted') {
    const data = await getTodos(params.page, params.pageSize);
    const result = data.filter((item : any) => !item.completed);
    return { data: result, totalItems: result.length };
  }
  const data = await getTodos(params.page, params.pageSize);
  const totalItems = await getTodoCount();
  return { data, totalItems };

   });

export const saveData = createAsyncThunk('todos/saveData', async (params: { data: Todo, page: number, pageSize : number }, thunkAPI) => {
  try {
    const data = await editTodo(params.data);
    message.success('Data saved successfully!');
    await thunkAPI.dispatch(fetchTodos({ page: params.page, pageSize: params.pageSize}));
  } catch (error) {
    message.error('Failed to save data.');
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteData = createAsyncThunk('todos/deleteData', async (params: { data: Todo, page: number, pageSize : number }, thunkAPI) => {
  try {
    if (!params.data.id) return thunkAPI.rejectWithValue('Invalid data');
    const promise = await deleteTodoById(params.data.id);
    message.success('Data deleted successfully!');
    await thunkAPI.dispatch(fetchTodos({ page: params.page, pageSize: params.pageSize}));
  } catch (error) {
    message.error('Failed to delete data.');
    return thunkAPI.rejectWithValue(error);
  }
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

export const changeTodoStatus = createAsyncThunk(
  'todos/changeTodoStatus',
  async (params: { todo: Todo, page: number, pageSize: number }, thunkAPI) => {
    try {
      const editedTodo = await flipTodoStatus(params.todo);
      message.success('Todo status changed successfully!');
      await thunkAPI.dispatch(fetchTodos({ page: params.page, pageSize: params.pageSize }));
    } catch (error) {
      message.error('Failed to change todo status.');
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
        createNewTodo: (state, action: PayloadAction<Todo>) => {
          state.data.push(action.payload);
        }
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
            state.error = action.error.message || 'Something went wrong while fetching data';
          })
          .addCase(saveData.pending, (state) => {
            state.loading = true;
          })
          .addCase(saveData.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(saveData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong while saving data';
          })
      },
    });

export const { setCurrentPage, setDefaultPageSize } = todoSlice.actions;

export default todoSlice.reducer;