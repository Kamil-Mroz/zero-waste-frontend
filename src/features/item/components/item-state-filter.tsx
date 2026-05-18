import MultiSelectMenu from "@/features/shared/components/multi-select-menu";
import { stateOptions } from "../constants";
import type { ItemStateType } from "../types";

export function ItemStateFilter({
	states,
	onChange,
}: {
	onChange: (value: ItemStateType[]) => void;
	states: ItemStateType[];
}) {
	return (
		<div>
			<MultiSelectMenu
				title="States"
				options={stateOptions}
				value={states}
				onChange={onChange}
				clearLabel="Reset"
			/>
		</div>
	);
}
