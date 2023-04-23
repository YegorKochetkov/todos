import React from "react";
import * as todosApi from "./api/todos.ts";
import "./App.css";
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTodoUpdating(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");

    if (title) {
      const newTodo = await todosApi.add(title);
      setTodos([...todos, newTodo]);
      form.reset();
    }

    setTodoUpdating(false);
  }

  async function handleRemove(todoId: string) {
    setTodoUpdating(true);

    await todosApi.remove(todoId).finally(() => {
      setTodoUpdating(false);
    });
    loadTodos();
  }

  React.useEffect(() => {
    loadTodos();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      <form onSubmit={async (e) => handleSubmit(e)}>
        <input type="text" name="title" required placeholder="add todo" />
      </form>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <p key={todo.id}>
          <>
            {todo.title} {todo.completed ? "done " : "not yet "}
            <button
              type="button"
              name="remove"
              onClick={async () => handleRemove(todo.id)}
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
