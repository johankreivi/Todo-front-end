export interface Todo {
    id?: number;
    title: string;
    completed: boolean;
    deadline?: string | null;
}