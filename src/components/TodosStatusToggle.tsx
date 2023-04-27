import React from "react";
import * as todosApi from "../api/todos.ts";
import { Todo } from "../types/todo.type.ts";

type TodosStatusToggleProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
};

function TodosStatusToggle({ todos, loadTodos }: TodosStatusToggleProps) {
	const [completeStatus, setCompleteStatus] = React.useState(true);
	const [isUpdating, setIsUpdating] = React.useState(false);

	function toggleAll() {
		setIsUpdating(true);

		todosApi
			.updateAll(
				todos
					.filter((todo) => todo.completed !== completeStatus)
					.map((todo) => ({ ...todo, completed: completeStatus }))
			)
			.then(loadTodos)
			.finally(() => {
				setCompleteStatus(!completeStatus);
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
