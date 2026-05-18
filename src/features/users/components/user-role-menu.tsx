import MultiSelectMenu from "@/features/shared/components/multi-select-menu";
import { roleOptions } from "../constants";
import type { Roles } from "../types";

export type UserRoleMenuProps = {
	roles: Roles[];
	onChange: (roles: Roles[]) => void;
};
export function UserRoleMenu({ roles, onChange }: UserRoleMenuProps) {
	return (
		<MultiSelectMenu
			title="Roles"
			options={roleOptions}
			value={roles}
			onChange={onChange}
			clearLabel="Clear filters"
		/>
	);
}
