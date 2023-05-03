import React from "react";
import todosApi from "../../api/todos.ts";
import TodoComplete from "./TodoComplete/TodoComplete.tsx";
import styles from "./TodoItem.module.scss";
import TodoRemove from "./TodoRemove/TodoRemove.tsx";
import TodoTitle from "./TodoTitle/TodoTitle.tsx";
import { type Todo } from "../../types/todo.type.ts";

export type TodoContextType = {
	todo: Todo;
	isUpdating: boolean;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	handleTitleUpdate: (title: string) => Promise<void>;
	handleRemove: (todoId: string) => Promise<void>;
	handleCompleteUpdate: (completed: boolean) => Promise<void>;
};

export const TodoContext = React.createContext<TodoContextType | null>(null);

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

	const todoCtx = {
		handleCompleteUpdate,
		todo,
		isEditing,
		setIsEditing,
		isUpdating,
		handleTitleUpdate,
		handleRemove,
	};

	return (
		<TodoContext.Provider value={todoCtx}>
			<form
				name='todo'
				onSubmit={(event) => handleSubmit(event)}
				className={styles.todo}
			>
				<TodoComplete />
				<TodoTitle />
				<TodoRemove />
			</form>
		</TodoContext.Provider>
	);
}

export default TodoItem;
