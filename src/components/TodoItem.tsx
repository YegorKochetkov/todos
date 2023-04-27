import React from "react";
import * as todosApi from "../api/todos.ts";
import TodoComplete from "./TodoComplete.tsx";
import TodoRemove from "./TodoRemove.tsx";
import TodoTitle from "./TodoTitle.tsx";
import { type Todo } from "../types/todo.type";

type TodoItemProps = {
	todo: Todo;
	loadTodos: () => Promise<void>;
};

function TodoItem({ todo, loadTodos }: TodoItemProps) {
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
			handleTitleUpdate(title);
		}

		setIsEditing(false);
	}

	async function handleTitleUpdate(title: string) {
		setIsUpdating(true);
		setIsEditing(false);

		if (title.length === 0 || title === todo.title) {
			setIsUpdating(false);
			return;
		}

		const updatedTodo = {
			...todo,
			title,
		};

		await todosApi.update(updatedTodo);
		await loadTodos();
		setIsUpdating(false);
	}

	async function handleCompleteUpdate(completed: boolean) {
		setIsUpdating(true);
		setIsEditing(false);

		const updatedTodo = {
			...todo,
			completed,
		};

		await todosApi.update(updatedTodo);
		await loadTodos();
		setIsUpdating(false);
	}

	async function handleRemove(todoId: string) {
		setIsUpdating(true);

		await todosApi.remove(todoId);
		await loadTodos();
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
					{...{ isEditing, setIsEditing, isUpdating, handleTitleUpdate, todo }}
				/>
				<TodoComplete {...{ handleCompleteUpdate, todo }} />
				<TodoRemove id={todo.id} {...{ handleRemove, isUpdating }} />
			</form>
		</li>
	);
}

export default TodoItem;
