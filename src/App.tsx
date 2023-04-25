import React from "react";
import * as todosApi from "./api/todos.ts";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem.tsx";
import { type Todo } from "./types/todo.type";

function App() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const [isLoading, setLoading] = React.useState(true);

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
			<AddTodo onAddTodo={handleAddTodo} />
			<ol style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onLoad={loadTodos} />
				))}
			</ol>
		</main>
	);
}

export default App;
