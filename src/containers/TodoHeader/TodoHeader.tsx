import AddTodo from "../../components/AddTodo/AddTodo";
import TodosStatusToggle from "../../components/TodosStatusToggle/TodosStatusToggle";
import styles from "./TodoHeader.module.scss";

function TodoHeader() {
	return (
		<header className={styles.todoHeader}>
			<TodosStatusToggle />
			<AddTodo />
		</header>
	);
}

export default TodoHeader;
