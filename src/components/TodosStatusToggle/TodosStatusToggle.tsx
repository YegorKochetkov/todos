import React from "react";
import { BsCheck2All } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import todosApi from "../../api/todos.ts";
import { TodosContext, TodosContextType } from "../../App.tsx";
import { Todo } from "../../types/todo.type.ts";
import styles from "./TodosStatusToggle.module.scss";

function TodosStatusToggle() {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const { loadTodos, filteredTodos: todos } = React.useContext(
		TodosContext
	) as TodosContextType;

	async function toggleAll() {
		if (todos.length === 0) {
			return;
		}

		setIsUpdating(true);

		let updatedTodos: Todo[] = todos
			.filter((todo) => todo.completed === false)
			.map((todo) => ({ ...todo, completed: true }));

		if (updatedTodos.length === 0) {
			updatedTodos = todos.map((todo) => ({
				...todo,
				completed: false,
			}));
		}

		await todosApi.updateAll(updatedTodos);
		await loadTodos();
		setIsUpdating(false);
	}

	return (
		<button
			onClick={toggleAll}
			disabled={isUpdating || todos.length === 0}
			title='Toggle all todos status'
			name='toggle status'
			type='button'
			className={styles.toggle}
		>
			{isUpdating ? (
				<GiSandsOfTime className={styles.icon} />
			) : (
				<BsCheck2All className={styles.icon} />
			)}
		</button>
	);
}

export default TodosStatusToggle;
