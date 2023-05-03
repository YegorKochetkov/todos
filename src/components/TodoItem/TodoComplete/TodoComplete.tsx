import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { Keys } from "../../../utils/keys";
import { TodoContext, TodoContextType } from "../TodoItem";
import styles from "./TodoComplete.module.scss";

function TodoComplete() {
	const { handleCompleteUpdate, todo } = React.useContext(
		TodoContext
	) as TodoContextType;

	function handleKeyDown(event: React.KeyboardEvent<HTMLLabelElement>) {
		if (event.key === Keys.enter || event.key === Keys.space) {
			handleCompleteUpdate(!todo.completed);
		}
	}

	return (
		<label
			htmlFor={todo.id}
			className={todo.completed ? styles.completed : styles.complete}
			tabIndex={0}
			onKeyDown={(event) => handleKeyDown(event)}
			title='Toggle todo status'
		>
			<input
				type='checkbox'
				id={todo.id}
				name='complete'
				value={todo.id}
				checked={todo.completed}
				onChange={() => handleCompleteUpdate(!todo.completed)}
				hidden
			/>

			{todo.completed && <BsCheck2 className={styles.icon} />}
		</label>
	);
}

export default TodoComplete;
