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
		<form onSubmit={(event) => handleSubmit(event)} name='add_todo'>
			<input
				type='text'
				name='title'
				required
				placeholder='What needs to be done?'
				value={title}
				onChange={(event) => setTitle(event.target.value.trimStart())}
				className={styles.newTodo}
			/>
			<button
				type='submit'
				disabled={isAdding}
				name='add todo'
				title='Add todo'
				className={`${!title ? "hidden" : ""}`}
			>
				{isAdding ? (
					<GiSandsOfTime className='icon' />
				) : (
					<BsPlusCircle className='icon' />
				)}
			</button>
		</form>
	);
}

export default AddTodo;
