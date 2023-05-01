type ActiveTodosCounterProps = {
	todos: number;
};

function ActiveTodosCounter({ todos }: ActiveTodosCounterProps) {
	return (
		<span>
			{todos}
			{todos === 1 ? " item left" : " items left"}
		</span>
	);
}

export default ActiveTodosCounter;
