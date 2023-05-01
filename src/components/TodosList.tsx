import { Todo } from "../types/todo.type";
import TodoItem from "./TodoItem";

type TodosListProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
};
function TodosList({ todos, loadTodos }: TodosListProps) {
	return (
		<ol>
			{todos.map((todo) => (
				<li key={todo.id}>
					<TodoItem {...{ todo, loadTodos }} />
				</li>
			))}
		</ol>
	);
}

export default TodosList;
