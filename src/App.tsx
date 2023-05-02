import React from "react";
import todosApi from "./api/todos.ts";
import "./App.scss";
import ActiveTodosCounter from "./components/ActiveTodosCounter.tsx";
import TodosList from "./components/TodoList/TodosList.tsx";
import TodosClearAllCompleted from "./components/TodosClearAllCompleted.tsx";
import TodosFilter from "./components/TodosFilter.tsx";
import TodosHint from "./components/TodosHint.tsx";
import TodoHeader from "./containers/TodoHeader/TodoHeader.tsx";
import useFilter, { Filters } from "./utils/useFilter.tsx";
import { type Todo } from "./types/todo.type";

export type TodosContextType = {
	filteredTodos: Todo[];
	loadTodos: () => Promise<void>;
	handleAddTodo: (title: string) => Promise<void>;
	filter: Filters;
	setFilter: React.Dispatch<React.SetStateAction<Filters>>;
	activeTodos: number;
};

export const TodosContext = React.createContext<TodosContextType | null>(null);

function App() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const { filter, setFilter, filteredTodos } = useFilter(todos);
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

	const todosCtx = {
		handleAddTodo,
		loadTodos,
		filteredTodos,
		filter,
		setFilter,
		activeTodos,
	};

	return (
		<main>
			<TodosContext.Provider value={todosCtx}>
				<article className='todoApp'>
					<h1>Todos</h1>
					<section>
						<TodoHeader />
						<TodosList />
						<TodosClearAllCompleted />
						<ActiveTodosCounter />
						<TodosFilter />
						<TodosHint />
					</section>
				</article>
			</TodosContext.Provider>
		</main>
	);
}

export default App;
