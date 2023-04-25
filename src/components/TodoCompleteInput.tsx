import React from "react";
import { Todo } from "../types/todo.type";

type TodoCompleteInputProps = {
	handleUpdate: (value: string | boolean) => Promise<void>;
	todo: Todo;
};

function TodoCompleteInput({ handleUpdate, todo }: TodoCompleteInputProps) {
	return (
		<React.Fragment>
			<input
				type='checkbox'
				id={todo.id}
				name='complete'
				value={todo.id}
				checked={todo.completed}
				onClick={() => handleUpdate(!todo.completed)}
			/>
			<label htmlFor={todo.id}>{todo.completed ? "done " : "not yet "}</label>
		</React.Fragment>
	);
}

export default TodoCompleteInput;
