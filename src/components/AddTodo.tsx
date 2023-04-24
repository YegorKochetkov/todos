import React from "react";

type AddTodoProps = {
	onAddTodo: (title: string) => Promise<void>;
};

function AddTodo({ onAddTodo }: AddTodoProps) {
	const [isAdding, setIsAdding] = React.useState(false);
	const [title, setTitle] = React.useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setIsAdding(true);
		await onAddTodo(title);
		setIsAdding(false);
		setTitle("");
	}

	return (
		<form onSubmit={(event) => handleSubmit(event)} name='add_todo'>
			<input
				type='text'
				name='title'
				required
				placeholder='add todo'
				value={title}
				onChange={(event) => setTitle(event.target.value.trimStart())}
			/>
			<input
				type='submit'
				value={isAdding ? "Wait" : "Add"}
				disabled={isAdding}
			/>
		</form>
	);
}

export default AddTodo;
