import React from "react";
import * as todosApi from "../api/todos.ts";
import { Todo } from "../types/todo.type.ts";
import { Filters } from "./TodosFilter.tsx";

type TodosStatusToggleProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
	filter: Filters;
};

function TodosStatusToggle({
	todos,
	loadTodos,
	filter,
}: TodosStatusToggleProps) {
	const [isUpdating, setIsUpdating] = React.useState(false);

	function toggleAll() {
		setIsUpdating(true);

		let filteredTodos: Todo[] = todos;

		if (filter === Filters.completed) {
			filteredTodos = todos.filter((todo) => todo.completed);
		}

		if (filter === Filters.active) {
			filteredTodos = todos.filter((todo) => !todo.completed);
		}

		if (filteredTodos.length === 0) {
			return;
		}

		filteredTodos = filteredTodos.map((todo) => ({
			...todo,
			completed: !todo.completed,
		}));

		todosApi
			.updateAll(filteredTodos)
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
