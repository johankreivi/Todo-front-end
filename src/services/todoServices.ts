import axios from 'axios';
import { Todo } from '../components/models/Todo';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;

export const createTodo = async (todo: { title: string; completed: boolean }) => {
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
    }

export const getTodos = async (page: number, pageSize: number) => {
    return axios.get(`${baseUrl}?pageNumber=${page}&pageSize=${pageSize}`)
        .then(response => response.data);
}

export const getTodoCount = async () => {
    return axios.get(`${baseUrl}/count`)
        .then(response => response.data);
}

export const flipTodoStatus = async (todo: Todo) => {
    return axios.put(`${baseUrl}`, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
}

export const editTodo = async (todo: Todo) => {
    return axios.put(`${baseUrl}`, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
}