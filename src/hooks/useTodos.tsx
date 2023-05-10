import React from "react";
import todosApi from "../api/todos";
import { Todo } from "../types/todo.type";

function useTodos() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const activeTodos = todos.filter((todo) => !todo.completed).length;

	async function loadTodos() {
		const todos = await todosApi.getAll();

		if (todos) {
			setTodos(todos);
		}
	}

	async function handleAddTodo(title: string) {
		const newTodo = await todosApi.add(title);

		if (newTodo) {
			setTodos([...todos, newTodo]);
		}
	}

	React.useEffect(() => {
		loadTodos();
	}, []);

	return { todos, activeTodos, loadTodos, handleAddTodo };
}

export default useTodos;
