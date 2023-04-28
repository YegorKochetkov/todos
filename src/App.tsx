import React from "react";
import todosApi from "./api/todos.ts";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem.tsx";
import TodosClearAllCompleted from "./components/TodosClearAllCompleted.tsx";
import TodosFilter from "./components/TodosFilter.tsx";
import TodosStatusToggle from "./components/TodosStatusToggle.tsx";
import useFilter from "./utils/useFilter.tsx";
import { type Todo } from "./types/todo.type";

function App() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const [filter, setFilter, filteredTodos] = useFilter(todos);

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

	return (
		<main>
			<h1>Todos</h1>
			<div style={{ marginBottom: "1rem" }}>
				<TodosStatusToggle {...{ loadTodos, todos: filteredTodos }} />
			</div>
			<AddTodo {...{ handleAddTodo }} />
			<ol style={{ paddingLeft: "1.5rem" }}>
				{filteredTodos.map((todo) => (
					<TodoItem key={todo.id} {...{ todo, loadTodos }} />
				))}
			</ol>
			<div style={{ marginBottom: "1rem" }}>
				<TodosClearAllCompleted {...{ loadTodos, todos: filteredTodos }} />
			</div>
			<TodosFilter {...{ filter, setFilter }} />
			<p>
				<b>Enter</b>, <b>Space</b> or <b>Double-click</b> to edit a todo
				<br />
				<b>Arrow</b> keys to switch filters
			</p>
		</main>
	);
}

export default App;
