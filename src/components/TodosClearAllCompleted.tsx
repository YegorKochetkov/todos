import React from "react";
import * as todosApi from "../api/todos.ts";
import { Todo } from "../types/todo.type.ts";

type TodoClearAllProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
};

function TodosClearAllCompleted({ todos, loadTodos }: TodoClearAllProps) {
	const [isUpdating, setIsUpdating] = React.useState(false);

	function clearAll() {
		setIsUpdating(true);

		Promise.all(
			todos
				.filter((todo) => todo.completed === true)
				.map((todo) => todosApi.remove(todo.id))
		)
			.then((todos) => {
				if (todos.length > 0) loadTodos();
			})
			.finally(() => setIsUpdating(false));
	}

	return (
		<button onClick={clearAll}>
			{isUpdating ? "Wait..." : "Clear all completed"}
		</button>
	);
}

export default TodosClearAllCompleted;
