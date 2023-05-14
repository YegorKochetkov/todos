import React from "react";
import "./App.scss";
import TodosList from "./components/TodoList/TodosList.tsx";
import TodosHint from "./components/TodosHint/TodosHint.tsx";
import TodoFooter from "./containers/TodoFooter/TodoFooter.tsx";
import TodoHeader from "./containers/TodoHeader/TodoHeader.tsx";
import useFilter, { Filters } from "./hooks/useFilter.tsx";
import useTodos from "./hooks/useTodos.tsx";
import { type Todo } from "./types/todo.type";

export type TodosContextType = {
	activeTodos: number;
	filteredTodos: Todo[];
	filter: Filters;
	setFilter: React.Dispatch<React.SetStateAction<Filters>>;
	loadTodos: () => Promise<void>;
	handleAddTodo: (title: string) => Promise<void>;
};

export const TodosContext = React.createContext<TodosContextType | null>(null);

function App() {
	const { todos, handleAddTodo, loadTodos, activeTodos } = useTodos();
	const { filteredTodos, filter, setFilter } = useFilter(todos);

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
						{todos.length > 0 && <TodoFooter />}
					</section>
				</article>
			</TodosContext.Provider>
			<TodosHint />
		</main>
	);
}

export default App;
