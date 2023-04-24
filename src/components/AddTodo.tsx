import React from "react";

type AddTodoProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function AddTodo({ handleSubmit }: AddTodoProps) {
  return (
    <form onSubmit={(event) => handleSubmit(event)} name="add_todo">
      <input type="text" name="title" required placeholder="add todo" />
      <input type="submit" value="Add" />
    </form>
  );
}

export default AddTodo;
