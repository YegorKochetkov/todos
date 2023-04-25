import React from "react";
import * as todosApi from "../api/todos.ts";
import TodoCompleteInput from "./TodoCompleteInput.tsx";
import TodoTitleInput from "./TodoTitleInput.tsx";
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
				<TodoTitleInput
					{...{ isEditing, setIsEditing, todoUpdating, handleUpdate, todo }}
				/>
				<TodoCompleteInput {...{ handleUpdate, todo }} />
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
