import ActiveTodosCounter from "../../components/ActiveTodosCounter/ActiveTodosCounter";
import TodosFilter from "../../components/TodoFilter/TodosFilter";
import TodosClearAllCompleted from "../../components/TodosClearAllCompleted/TodosClearAllCompleted";
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
