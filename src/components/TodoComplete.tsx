import React from "react";
import { Todo } from "../types/todo.type";

type TodoCompleteProps = {
	handleCompleteUpdate: (completed: boolean) => Promise<void>;
	todo: Todo;
};

function TodoComplete({ handleCompleteUpdate, todo }: TodoCompleteProps) {
	return (
		<label
			htmlFor={todo.id}
			style={{ display: "flex", alignItems: "center", padding: "0.25rem" }}
		>
			<input
				type='checkbox'
				id={todo.id}
				name='complete'
				value={todo.id}
				checked={todo.completed}
				onChange={() => handleCompleteUpdate(!todo.completed)}
				style={{ width: "1rem", height: "1rem" }}
			/>

			{todo.completed ? "done " : "not yet "}
		</label>
	);
}

export default TodoComplete;
