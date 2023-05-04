import React from "react";
import { TodosContext, TodosContextType } from "../../App";
import { Filters } from "../../hooks/useFilter";
import { Keys } from "../../utils/keys";
import styles from "./TodoFilter.module.scss";

function TodosFilter() {
	const { filter, setFilter } = React.useContext(
		TodosContext
	) as TodosContextType;

	function handleFilter(event: React.KeyboardEvent<HTMLLabelElement>) {
		if (event.key === Keys.enter || event.key === Keys.space) {
			const filter = event.currentTarget.htmlFor as Filters;
			setFilter(filter);
		}
	}

	return (
		<fieldset className={styles.filter} name='filters'>
			<label
				htmlFor='all'
				tabIndex={0}
				onKeyDown={(event) => handleFilter(event)}
				className={filter === Filters.all ? styles.selected : ""}
			>
				<input
					type='radio'
					id='all'
					name='filter'
					value='all'
					checked={filter === Filters.all}
					onChange={() => setFilter(Filters.all)}
					hidden
				/>
				All
			</label>
			<label
				htmlFor='completed'
				tabIndex={0}
				onKeyDown={(event) => handleFilter(event)}
				className={filter === Filters.completed ? styles.selected : ""}
			>
				<input
					type='radio'
					id='completed'
					name='filter'
					value='completed'
					checked={filter === Filters.completed}
					onChange={() => setFilter(Filters.completed)}
					hidden
				/>
				Completed
			</label>
			<label
				htmlFor='active'
				tabIndex={0}
				onKeyDown={(event) => handleFilter(event)}
				className={filter === Filters.active ? styles.selected : ""}
			>
				<input
					type='radio'
					id='active'
					name='filter'
					value='active'
					checked={filter === Filters.active}
					onChange={() => setFilter(Filters.active)}
					hidden
				/>
				Active
			</label>
		</fieldset>
	);
}

export default TodosFilter;
