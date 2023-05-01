import React from "react";
import { TodosContext, TodosContextType } from "../App";

function ActiveTodosCounter() {
	const { activeTodos } = React.useContext(TodosContext) as TodosContextType;

	return (
		<span>
			{activeTodos}
			{activeTodos === 1 ? " item left" : " items left"}
		</span>
	);
}

export default ActiveTodosCounter;
