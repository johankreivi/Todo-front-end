import { Todo } from "./Todo";

//create props interface for TodosForm component
export type TodosFormsProps = {
    onFormSubmit: (todo: Todo) => void;
}
