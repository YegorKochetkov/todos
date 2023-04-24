import React from "react";
import * as todosApi from "../api/todos.ts";
import { type Todo } from "../types/todo.type";

type TodoItemProps = {
	todo: Todo;
	onLoad: () => Promise<void>;
};

function TodoItem({ todo, onLoad }: TodoItemProps) {
	const [todoUpdating, setTodoUpdating] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const data = new FormData(form);

		const title = data.get("todo")?.toString().trimStart();

		if (title?.length === 0) {
			return;
		}

		if (title && title !== todo.title) {
			handleUpdate(title);
		}

		setIsEditing(false);
	}

	async function handleUpdate(value: string | boolean) {
		setTodoUpdating(true);
		setIsEditing(false);

		if (typeof value === "string" && value.length === 0) {
			setTodoUpdating(false);
			return;
		}

		if (todo.title === value) {
			setTodoUpdating(false);
			return;
		}

		const updatedTodo = {
			...todo,
		};

		if (typeof value === "string" && value.length > 0) {
			updatedTodo.title = value;
		}

		if (typeof value === "boolean") {
			updatedTodo.completed = value;
		}

		await todosApi.update(updatedTodo);
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
		<form name='todo' onSubmit={(event) => handleSubmit(event)}>
			{isEditing ? (
				<input
					type='text'
					name={"todo"}
					onBlur={(event) => handleUpdate(event.target.value.trimStart())}
					defaultValue={todo.title}
					style={{ borderColor: "transparent", width: "30rem" }}
					onKeyDown={(event) => setIsEditing(!(event.key === "Escape"))}
					required
					autoFocus
				/>
			) : (
				<p
					style={{ width: "30rem", display: "inline-block", margin: "0" }}
					onDoubleClick={() => {
						setIsEditing(true);
					}}
				>
					{todo.title}
				</p>
			)}

			<input
				type='checkbox'
				id={todo.id}
				name='complete'
				value={todo.id}
				checked={todo.completed}
				onClick={() => handleUpdate(!todo.completed)}
			/>
			<label htmlFor={todo.id}>{todo.completed ? "done " : "not yet "}</label>

			<button
				type='button'
				name='remove'
				onClick={() => handleRemove(todo.id)}
				disabled={todoUpdating}
			>
				{todoUpdating ? "Wait..." : "Remove"}
			</button>
		</form>
	);
}

export default TodoItem;
