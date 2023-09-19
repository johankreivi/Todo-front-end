import { Todo } from "./Todo";

//create props interface for TodoListTable component
export type TodoListTableProps = {
    todos: Todo[];
    onPaginate: (page: number, pageSize: number) => void;
}
