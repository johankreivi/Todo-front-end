import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;
// create a new todo item using the API endpoint
export const createTodo = async (todo: { title: string; completed: boolean }) => {
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
    }