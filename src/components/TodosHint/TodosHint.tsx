import styles from "./TodosHint.module.scss";

function TodosHint() {
	return (
		<section className={styles.hint}>
			<p>
				<b>Tab</b>, <b>Enter</b>, <b>Space</b>, <b>Delete</b> and{" "}
				<b>Double-click</b> to manage todos
			</p>
			<p>
				<b>Ctrl</b> + <b>Shift</b> + <b>F</b> to focus in add todo field
			</p>
		</section>
	);
}

export default TodosHint;
