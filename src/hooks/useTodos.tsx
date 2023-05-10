import React from "react";
import todosApi from "../api/todos";
import { Todo } from "../types/todo.type";

function useTodos() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const activeTodos = todos.filter((todo) => !todo.completed).length;

	function loadTodos() {
		return todosApi.getAll().then(setTodos);
	}

	async function handleAddTodo(title: string) {
		const newTodo = await todosApi.add(title);
		setTodos([...todos, newTodo]);
	}

	React.useEffect(() => {
		loadTodos();
	}, []);

	return { todos, activeTodos, loadTodos, handleAddTodo };
}

export default useTodos;
