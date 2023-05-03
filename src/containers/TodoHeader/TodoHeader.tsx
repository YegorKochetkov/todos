import AddTodo from "../../components/AddTodo/AddTodo";
import TodosStatusToggle from "../../components/TodosStatusToggle/TodosStatusToggle";
import styles from "./TodoHeader.module.scss";

function TodoHeader() {
	return (
		<div className={styles.todoHeader}>
			<TodosStatusToggle />
			<AddTodo />
		</div>
	);
}

export default TodoHeader;
