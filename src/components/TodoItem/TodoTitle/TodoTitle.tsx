import React from "react";
import { Keys } from "../../../utils/keys";
import { TodoContext, TodoContextType } from "../TodoItem";
import styles from "./TodoTitle.module.scss";

function TodoTitle() {
	const {
		isEditing,
		setIsEditing,
		todo,
		isUpdating,
		handleTitleUpdate,
		handleRemove,
	} = React.useContext(TodoContext) as TodoContextType;

	const [title, setTitle] = React.useState(todo.title);

	function handleBlur() {
		handleTitleUpdate(title);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === Keys.escape) {
			setTitle(todo.title);
			setIsEditing(false);
		}
	}

	const titleInput = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		titleInput.current?.focus();
	}, [isEditing]);

	const id = React.useId();

	return (
		<React.Fragment>
			<label
				htmlFor='todo_title'
				onDoubleClick={() => {
					setIsEditing(true);
				}}
				onKeyUp={(event) =>
					setIsEditing(event.key === Keys.enter || event.key === Keys.space)
				}
				onKeyDown={(event) =>
					event.key === Keys.delete && handleRemove(todo.id)
				}
				tabIndex={0}
				className={styles.todoLabel}
				hidden={isEditing}
				title={todo.title}
			>
				{isUpdating ? "Updating..." : todo.title}
			</label>
			<input
				type='text'
				name={"todo"}
				id={`todo_title-${id}`}
				onBlur={handleBlur}
				onKeyDown={(event) => handleKeyDown(event)}
				onChange={(event) => setTitle(event.target.value.trimStart())}
				value={title}
				required
				className={styles.todoInput}
				ref={titleInput}
				hidden={!isEditing}
			/>
		</React.Fragment>
	);
}

export default TodoTitle;
