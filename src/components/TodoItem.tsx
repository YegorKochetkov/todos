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

		if (typeof value === "string") {
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
		<li>
			<form
				name='todo'
				onSubmit={(event) => handleSubmit(event)}
				style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
			>
				{isEditing ? (
					<input
						type='text'
						name={"todo"}
						id='todo_title'
						onBlur={(event) => handleUpdate(event.target.value.trimStart())}
						defaultValue={todo.title}
						style={{
							boxSizing: "border-box",
							width: "20rem",
							height: "2rem",
							padding: "0.25rem",
							margin: "0",
							marginBottom: "0.25rem",
							borderRadius: "3px",
							fontSize: "1rem",
						}}
						onKeyDown={(event) => setIsEditing(!(event.key === "Escape"))}
						required
						autoFocus
					/>
				) : (
					<label
						htmlFor='todo_title'
						style={{
							boxSizing: "border-box",
							display: "inline-block",
							width: "20rem",
							height: "2rem",
							padding: "0.25rem",
							margin: "0",
							marginBottom: "0.25rem",
							border: "2px solid transparent",
							borderRadius: "3px",
							fontSize: "1rem",
						}}
						onDoubleClick={() => {
							setIsEditing(true);
						}}
						onKeyUpCapture={(event) =>
							setIsEditing(() => event.key === "Enter")
						}
						tabIndex={0}
					>
						{todoUpdating ? "Updating..." : todo.title}
					</label>
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
		</li>
	);
}

export default TodoItem;
