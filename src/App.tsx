import React from "react";
import * as todosApi from "./api/todos.ts";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { type Todo } from "./types/todo.type";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [todoUpdating, setTodoUpdating] = React.useState(false);

  function loadTodos() {
    setTodoUpdating(true);

    todosApi
      .getAll()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
        setTodoUpdating(false);
      });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodoUpdating(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");

    if (title) {
      const newTodo = await todosApi.add(title);
      setTodos([...todos, newTodo]);
      form.reset();
    }

    setTodoUpdating(false);
  }

  function handleUpdate(todo: Todo) {
    setTodoUpdating(true);

    todosApi.update(todo).finally(() => {
      setTodoUpdating(false);
      loadTodos();
    });
  }

  function handleRemove(todoId: string) {
    setTodoUpdating(true);

    todosApi.remove(todoId).finally(() => {
      setTodoUpdating(false);
      loadTodos();
    });
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
      <AddTodo handleSubmit={handleSubmit} />
      {todos.map((todo) => (
        <p key={todo.id}>
          <>
            <input
              type="text"
              name={`todo_${todo.id}`}
              onBlur={(event) =>
                handleUpdate({ ...todo, title: event.target.value })
              }
              defaultValue={todo.title}
              style={{ borderColor: "transparent" }}
            />
            {todo.completed ? "done " : "not yet "}
            <button
              type="button"
              name="remove"
              onClick={() => handleRemove(todo.id)}
              disabled={todoUpdating}
            >
              {todoUpdating ? "Wait..." : "Remove"}
            </button>
          </>
        </p>
      ))}
    </main>
  );
}

export default App;
