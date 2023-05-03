import ActiveTodosCounter from "../../components/ActiveTodosCounter";
import TodosClearAllCompleted from "../../components/TodosClearAllCompleted";
import TodosFilter from "../../components/TodosFilter";
import styles from "./TodoFooter.module.scss";

function TodoFooter() {
	return (
		<footer className={styles.todoFooter}>
			<ActiveTodosCounter />
			<TodosFilter />
			<TodosClearAllCompleted />
		</footer>
	);
}

export default TodoFooter;
