import React from "react";
import { Todo } from "../../types/todo.type";
import styles from "./TodoTitle.module.scss";

type TodoTitleProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	isUpdating: boolean;
	handleTitleUpdate: (title: string) => Promise<void>;
	todo: Todo;
};

function TodoTitle(props: TodoTitleProps) {
	const { isEditing, setIsEditing, todo, isUpdating, handleTitleUpdate } =
		props;

	const [title, setTitle] = React.useState(todo.title);

	function handleBlur() {
		handleTitleUpdate(title);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Escape") {
			setTitle(todo.title);
			setIsEditing(false);
		}
	}

	const titleInput = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		titleInput.current?.focus();
	}, [isEditing]);

	return (
		<React.Fragment>
			<label
				htmlFor='todo_title'
				onDoubleClick={() => {
					setIsEditing(true);
				}}
				onKeyUpCapture={(event) =>
					setIsEditing(event.key === "Enter" || event.key === " ")
				}
				tabIndex={0}
				className={styles.todoLabel + " " + `${isEditing ? "hidden" : ""}`}
			>
				{isUpdating ? "Updating..." : todo.title}
			</label>
			<input
				type='text'
				name={"todo"}
				id='todo_title'
				onBlur={handleBlur}
				onKeyDown={(event) => handleKeyDown(event)}
				onChange={(event) => setTitle(event.target.value.trimStart())}
				value={title}
				required
				className={styles.todoInput + " " + `${isEditing ? "" : "hidden"}`}
				ref={titleInput}
			/>
		</React.Fragment>
	);
}

export default TodoTitle;
