import React from "react";
import { Todo } from "../types/todo.type";

export enum Filters {
	all = "all",
	completed = "completed",
	active = "active",
}

function useFilter(todos: Todo[]) {
	const [filter, setFilter] = React.useState(Filters.all);
	const [filteredTodos, setFilteredTodos] = React.useState(todos);

	function filterTodos(filter: Filters, todos: Todo[]) {
		switch (filter) {
			case (filter = Filters.completed):
				return todos.filter((todo) => todo.completed);

			case (filter = Filters.active):
				return todos.filter((todo) => !todo.completed);

			default:
				return todos;
		}
	}

	React.useEffect(() => {
		const filteredTodos = filterTodos(filter, todos);
		setFilteredTodos(filteredTodos);
	}, [filter, todos]);

	return { filter, setFilter, filteredTodos, setFilteredTodos } as const;
}

export default useFilter;
