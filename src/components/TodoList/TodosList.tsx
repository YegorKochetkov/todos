import React from "react";
import { TodosContext, TodosContextType } from "../../App";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

function TodosList() {
	const { filteredTodos: todos } = React.useContext(
		TodosContext
	) as TodosContextType;

	return (
		<ul className={styles.todoList}>
			{todos.map((todo) => (
				<li key={todo.id}>
					<TodoItem {...{ todo }} />
				</li>
			))}
		</ul>
	);
}

export default TodosList;
