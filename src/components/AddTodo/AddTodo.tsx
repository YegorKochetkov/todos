import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { TodosContext, TodosContextType } from "../../App";
import styles from "./AddTodo.module.scss";

function AddTodo() {
	const [isAdding, setIsAdding] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const { handleAddTodo } = React.useContext(TodosContext) as TodosContextType;

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setIsAdding(true);
		await handleAddTodo(title);
		setIsAdding(false);
		setTitle("");
	}

	return (
		<form
			onSubmit={(event) => handleSubmit(event)}
			name='add_todo'
			className={styles.newTodo}
		>
			<input
				type='text'
				name='title'
				required
				placeholder='What needs to be done?'
				value={title}
				onChange={(event) => setTitle(event.target.value.trimStart())}
			/>
			<button
				type='submit'
				disabled={isAdding}
				name='add todo'
				title='Add todo'
				className={!title ? styles.hidden : ""}
			>
				{isAdding ? (
					<GiSandsOfTime className={styles.icon} />
				) : (
					<BsPlusCircle className={styles.icon} />
				)}
			</button>
		</form>
	);
}

export default AddTodo;
