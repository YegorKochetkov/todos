type TodoRemoveProps = {
	isUpdating: boolean;
	handleRemove: (todoId: string) => Promise<void>;
	id: string;
};

function TodoRemove({ handleRemove, isUpdating, id }: TodoRemoveProps) {
	return (
		<button
			type='button'
			name='remove'
			onClick={() => handleRemove(id)}
			disabled={isUpdating}
		>
			{isUpdating ? "Wait..." : "Remove"}
		</button>
	);
}

export default TodoRemove;
