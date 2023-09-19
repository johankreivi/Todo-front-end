import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;
// create a new todo item using the API endpoint
export const createTodo = async (todo: { title: string; completed: boolean }) => {
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
    }

// get all todo items using the API endpoint, with page and page size parameters
export const getTodos = async (page: number, pageSize: number) => {
    return axios.get(`${baseUrl}?pageNumber=${page}&pageSize=${pageSize}`)
        .then(response => response.data);
}

// get total number of todo items using the API endpoint
export const getTodoCount = async () => {
    return axios.get(`${baseUrl}/count`)
        .then(response => response.data);
}