import React from "react";
import todosApi from "../../api/todos.ts";
import { TodosContext, TodosContextType } from "../../App.tsx";
import { Filters } from "../../hooks/useFilter.tsx";
import styles from "./TodosClearAllCompleted.module.scss";

function TodosClearAllCompleted() {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const {
		filteredTodos: todos,
		loadTodos,
		filter,
	} = React.useContext(TodosContext) as TodosContextType;

	async function clearAll() {
		setIsUpdating(true);
		const filteredTodos = todos.filter((todo) => todo.completed === true);

		if (filteredTodos.length === 0) {
			setIsUpdating(false);
			return;
		}

		await todosApi.deleteAll(filteredTodos.map((todo) => todo.id));
		await loadTodos();
		setIsUpdating(false);
	}

	return (
		<button
			onClick={clearAll}
			type='button'
			name='clear all'
			className={styles.clearAll}
			disabled={filter === Filters.active}
		>
			{isUpdating ? "Wait..." : "Clear all completed"}
		</button>
	);
}

export default TodosClearAllCompleted;
