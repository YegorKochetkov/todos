import React from "react";

type AddTodoProps = {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function AddTodo({ onSubmit }: AddTodoProps) {
	const [isAdding, setIsAdding] = React.useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		setIsAdding(true);
		await onSubmit(event);
		setIsAdding(false);
	}

	return (
		<form onSubmit={(event) => handleSubmit(event)} name='add_todo'>
			<input type='text' name='title' required placeholder='add todo' />
			<input
				type='submit'
				value={isAdding ? "Wait" : "Add"}
				disabled={isAdding}
			/>
		</form>
	);
}

export default AddTodo;
