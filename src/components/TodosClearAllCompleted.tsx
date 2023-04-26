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
		const filteredTodos = todos.filter((todo) => todo.completed === true);

		if (filteredTodos.length === 0) {
			setIsUpdating(false);
			return;
		}

		todosApi
			.deleteAll(filteredTodos.map((todo) => todo.id))
			.then(loadTodos)
			.finally(() => setIsUpdating(false));
	}

	return (
		<button onClick={clearAll}>
			{isUpdating ? "Wait..." : "Clear all completed"}
		</button>
	);
}

export default TodosClearAllCompleted;
