import React from "react";
import { TodosContext, TodosContextType } from "../../App";
import styles from "./ActiveTodosCounter.module.scss";

function ActiveTodosCounter() {
	const { activeTodos } = React.useContext(TodosContext) as TodosContextType;

	return (
		<span className={styles.counter}>
			{activeTodos}
			{activeTodos === 1 ? " item left" : " items left"}
		</span>
	);
}

export default ActiveTodosCounter;
