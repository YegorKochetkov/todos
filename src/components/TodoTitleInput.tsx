import React from "react";
import { Todo } from "../types/todo.type";

type TodoTitleInputProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  handleUpdate: (value: string | boolean) => Promise<void>;
  todo: Todo;
};

function TodoTitleInput(props: TodoTitleInputProps) {
  const { isEditing, setIsEditing, todo, isUpdating, handleUpdate } = props;

  return (
    <React.Fragment>
      {isEditing ? (
        <input
          type="text"
          name={"todo"}
          id="todo_title"
          onBlur={(event) => handleUpdate(event.target.value.trimStart())}
          onKeyDown={(event) => setIsEditing(!(event.key === "Escape"))}
          defaultValue={todo.title}
          style={{
            boxSizing: "border-box",
            width: "20rem",
            height: "2rem",
            padding: "0.25rem",
            margin: "0",
            marginBottom: "0.25rem",
            borderRadius: "3px",
            fontSize: "1rem",
          }}
          required
          autoFocus
        />
      ) : (
        <label
          htmlFor="todo_title"
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            width: "20rem",
            height: "2rem",
            padding: "0.25rem",
            margin: "0",
            marginBottom: "0.25rem",
            border: "2px solid transparent",
            borderRadius: "3px",
            fontSize: "1rem",
          }}
          onDoubleClick={() => {
            setIsEditing(true);
          }}
          onKeyUpCapture={(event) => setIsEditing(() => event.key === "Enter")}
          tabIndex={0}
        >
          {isUpdating ? "Updating..." : todo.title}
        </label>
      )}
    </React.Fragment>
  );
}

export default TodoTitleInput;
