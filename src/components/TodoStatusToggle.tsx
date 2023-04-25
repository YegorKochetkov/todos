import React from "react";
import * as todosApi from "../api/todos.ts";
import { Todo } from "../types/todo.type";

type TodoStatusToggleProps = {
	todos: Todo[];
	loadTodos: () => Promise<void>;
};

function TodoStatusToggle({ todos, loadTodos }: TodoStatusToggleProps) {
	const [completeStatus, setCompleteStatus] = React.useState(true);
	const [isUpdating, setIsUpdating] = React.useState(false);

	function toggleAll() {
		setIsUpdating(true);

		Promise.all(
			todos
				.filter((todo) => todo.completed !== completeStatus)
				.map((todo) => todosApi.update({ ...todo, completed: completeStatus }))
		)
			.then(loadTodos)
			.finally(() => {
				setCompleteStatus(!completeStatus);
				setIsUpdating(false);
			});
	}

	return (
		<button onClick={toggleAll}>
			{isUpdating ? "Wait..." : "Toggle complete status"}
		</button>
	);
}

export default TodoStatusToggle;
