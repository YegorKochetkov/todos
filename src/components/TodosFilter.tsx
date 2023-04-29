import React from "react";
import { Filters } from "../utils/useFilter";

type TodosFilterType = {
	filter: Filters;
	setFilter: React.Dispatch<React.SetStateAction<Filters>>;
};

function TodosFilter({ filter, setFilter }: TodosFilterType) {
	return (
		// TODO: add in css class outline to label when focused
		<fieldset style={{ border: "none" }}>
			<label
				htmlFor='all'
				style={{
					border: `${
						filter === Filters.all
							? "1px solid lightgrey"
							: "1px solid transparent"
					}`,
					padding: "0.25rem 0.5rem",
					textAlign: "center",
					position: "relative",
					marginRight: "0.5rem",
				}}
			>
				<input
					type='radio'
					id='all'
					name='filter'
					value='all'
					checked={filter === Filters.all}
					onChange={() => setFilter(Filters.all)}
					style={{ position: "absolute", opacity: "0", left: "-0.75rem" }}
				/>
				all
			</label>
			<label
				htmlFor='completed'
				style={{
					border: `${
						filter === Filters.completed
							? "1px solid lightgrey"
							: "1px solid transparent"
					}`,
					padding: "0.25rem 0.5rem",
					textAlign: "center",
					position: "relative",
					marginRight: "0.5rem",
				}}
			>
				<input
					type='radio'
					id='completed'
					name='filter'
					value='completed'
					checked={filter === Filters.completed}
					onChange={() => setFilter(Filters.completed)}
					style={{ position: "absolute", opacity: "0", left: "-0.75rem" }}
				/>
				completed
			</label>
			<label
				htmlFor='active'
				style={{
					border: `${
						filter === Filters.active
							? "1px solid lightgrey"
							: "1px solid transparent"
					}`,
					padding: "0.25rem 0.5rem",
					textAlign: "center",
					position: "relative",
					marginRight: "0.5rem",
				}}
			>
				<input
					type='radio'
					id='active'
					name='filter'
					value='active'
					checked={filter === Filters.active}
					onChange={() => setFilter(Filters.active)}
					style={{ position: "absolute", opacity: "0", left: "-0.75rem" }}
				/>
				active
			</label>
		</fieldset>
	);
}

export default TodosFilter;
