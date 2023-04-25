import React from "react";
import * as todosApi from "../api/todos.ts";
import TodoComplete from "./TodoComplete.tsx";
import TodoRemove from "./TodoRemove.tsx";
import TodoTitle from "./TodoTitle.tsx";
import { type Todo } from "../types/todo.type";

type TodoItemProps = {
	todo: Todo;
	onLoad: () => Promise<void>;
};

function TodoItem({ todo, onLoad }: TodoItemProps) {
	const [isUpdating, setIsUpdating] = React.useState(false);
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
		setIsUpdating(true);
		setIsEditing(false);

		if (typeof value === "string" && value.length === 0) {
			setIsUpdating(false);
			return;
		}

		if (todo.title === value) {
			setIsUpdating(false);
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
		setIsUpdating(false);
	}

	async function handleRemove(todoId: string) {
		setIsUpdating(true);

		await todosApi.remove(todoId);
		await onLoad();
		setIsUpdating(false);
	}

	return (
		<li>
			<form
				name='todo'
				onSubmit={(event) => handleSubmit(event)}
				style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
			>
				<TodoTitle
					{...{ isEditing, setIsEditing, isUpdating, handleUpdate, todo }}
				/>
				<TodoComplete {...{ handleUpdate, todo }} />
				<TodoRemove id={todo.id} {...{ handleRemove, isUpdating }} />
			</form>
		</li>
	);
}

export default TodoItem;
