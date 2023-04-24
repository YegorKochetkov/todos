import React from "react";
import * as todosApi from "../api/todos.ts";
import { type Todo } from "../types/todo.type";

type TodoItemProps = {
	todo: Todo;
	onLoad: () => Promise<void>;
};

function TodoItem({ todo, onLoad }: TodoItemProps) {
	const [todoUpdating, setTodoUpdating] = React.useState(false);

	async function handleUpdate(todo: Todo) {
		setTodoUpdating(true);

		await todosApi.update(todo);
		await onLoad();
		setTodoUpdating(false);
	}

	async function handleRemove(todoId: string) {
		setTodoUpdating(true);

		await todosApi.remove(todoId);
		await onLoad();
		setTodoUpdating(false);
	}

	return (
		<p>
			<input
				type='text'
				name={`todo_${todo.id}`}
				onBlur={(event) => handleUpdate({ ...todo, title: event.target.value })}
				defaultValue={todo.title}
				style={{ borderColor: "transparent" }}
			/>
			{todo.completed ? "done " : "not yet "}
			<button
				type='button'
				name='remove'
				onClick={() => handleRemove(todo.id)}
				disabled={todoUpdating}
			>
				{todoUpdating ? "Wait..." : "Remove"}
			</button>
		</p>
	);
}

export default TodoItem;
