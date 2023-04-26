import React from "react";
import { Filters } from "../App";

type TodosFilterType = {
	filter: Filters;
	setFilter: React.Dispatch<React.SetStateAction<Filters>>;
};

function TodosFilter({ filter, setFilter }: TodosFilterType) {
	return (
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
				}}
			>
				all
				<input
					type='radio'
					id='all'
					name='filter'
					value='all'
					checked={filter === Filters.all}
					onChange={() => setFilter(Filters.all)}
					style={{ visibility: "hidden", position: "absolute" }}
				/>
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
				}}
			>
				completed
				<input
					type='radio'
					id='completed'
					name='filter'
					value='completed'
					checked={filter === Filters.completed}
					onChange={() => setFilter(Filters.completed)}
					style={{ visibility: "hidden", position: "absolute" }}
				/>
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
				}}
			>
				active
				<input
					type='radio'
					id='active'
					name='filter'
					value='active'
					checked={filter === Filters.active}
					onChange={() => setFilter(Filters.active)}
					style={{ visibility: "hidden", position: "absolute" }}
				/>
			</label>
		</fieldset>
	);
}

export default TodosFilter;
