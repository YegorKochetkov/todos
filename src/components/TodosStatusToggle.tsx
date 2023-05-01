import React from "react";
import todosApi from "../api/todos.ts";
import { TodosContext, TodosContextType } from "../App.tsx";
import { Todo } from "../types/todo.type.ts";

function TodosStatusToggle() {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const { loadTodos, filteredTodos: todos } = React.useContext(
		TodosContext
	) as TodosContextType;

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
		<button
			onClick={toggleAll}
			disabled={isUpdating}
			title='Toggle all todos status'
			name='toggle status'
			type='button'
		>
			{isUpdating ? "⌛" : "✔️"}
		</button>
	);
}

export default TodosStatusToggle;
