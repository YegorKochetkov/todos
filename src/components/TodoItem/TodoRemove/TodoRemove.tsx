import React from "react";
import { BsX } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { TodoContext, TodoContextType } from "../TodoItem";
import styles from "./TodoRemove.module.scss";

function TodoRemove() {
	const { handleRemove, isUpdating, todo, isEditing } = React.useContext(
		TodoContext
	) as TodoContextType;

	return (
		<button
			type='button'
			name='remove'
			onClick={() => handleRemove(todo.id)}
			disabled={isUpdating}
			className={isEditing ? styles.hidden : styles.remove}
			title='Remove todo'
		>
			{isUpdating ? (
				<GiSandsOfTime className={styles.icon} />
			) : (
				<BsX className={styles.icon} />
			)}
		</button>
	);
}

export default TodoRemove;
