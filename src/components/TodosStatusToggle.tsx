import React from "react";
import * as todosApi from "../api/todos.ts";
import { Todo } from "../types/todo.type.ts";

type TodosStatusToggleProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
};

function TodosStatusToggle({ todos, loadTodos }: TodosStatusToggleProps) {
	const [isUpdating, setIsUpdating] = React.useState(false);

	function toggleAll() {
		if (todos.length === 0) {
			return;
		}

		setIsUpdating(true);

		const updatedTodos: Todo[] = todos.map((todo) => ({
			...todo,
			completed: !todo.completed,
		}));

		todosApi
			.updateAll(updatedTodos)
			.then(loadTodos)
			.finally(() => {
				setIsUpdating(false);
			});
	}

	return (
		<button onClick={toggleAll} disabled={isUpdating}>
			{isUpdating ? "Wait..." : "Toggle complete status"}
		</button>
	);
}

export default TodosStatusToggle;
