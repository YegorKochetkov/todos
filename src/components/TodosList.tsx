import React from "react";
import { TodosContext, TodosContextType } from "../App";
import TodoItem from "./TodoItem";

function TodosList() {
	const { filteredTodos: todos, loadTodos } = React.useContext(
		TodosContext
	) as TodosContextType;

	return (
		<ol>
			{todos.map((todo) => (
				<li key={todo.id}>
					<TodoItem {...{ todo, loadTodos }} />
				</li>
			))}
		</ol>
	);
}

export default TodosList;
