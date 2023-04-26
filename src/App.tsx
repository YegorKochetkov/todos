import React from "react";
import * as todosApi from "./api/todos.ts";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem.tsx";
import TodosClearAllCompleted from "./components/TodosClearAllCompleted.tsx";
import TodosFilter from "./components/TodosFilter.tsx";
import TodosStatusToggle from "./components/TodosStatusToggle.tsx";
import useFilter from "./utils/useFilter.tsx";
import { type Todo } from "./types/todo.type";

export enum Filters {
	all = "all",
	completed = "completed",
	active = "active",
}

function App() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const [isLoading, setLoading] = React.useState(true);

	const [filter, setFilter, filteredTodos] = useFilter(todos);

	function loadTodos() {
		return todosApi
			.getAll()
			.then(setTodos)
			.finally(() => {
				setLoading(false);
			});
	}

	async function handleAddTodo(title: string) {
		const newTodo = await todosApi.add(title);
		setTodos([...todos, newTodo]);
	}

	React.useEffect(() => {
		loadTodos();
	}, []);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	return (
		<main>
			<h1>Todos</h1>
			<div style={{ marginBottom: "1rem" }}>
				<TodosStatusToggle {...{ loadTodos, todos: filteredTodos }} />
			</div>
			<AddTodo {...{ handleAddTodo }} />
			<ol style={{ paddingLeft: "1.5rem" }}>
				{filteredTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onLoad={loadTodos} />
				))}
			</ol>
			<p>
				<b>Enter</b>, <b>Space</b> or <b>Double-click</b> to edit a todo
			</p>
			<div style={{ marginBottom: "1rem" }}>
				<TodosClearAllCompleted {...{ loadTodos, todos: filteredTodos }} />
			</div>
			<TodosFilter {...{ filter, setFilter }} />
		</main>
	);
}

export default App;
