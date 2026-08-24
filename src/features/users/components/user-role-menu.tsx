import MultiSelectMenu from "@/features/shared/components/multi-select-menu";
import { USER_ROLES } from "../constants";
import type { Roles } from "../types";

export type UserRoleMenuProps = {
	roles: Roles[];
	onChange: (roles: Roles[]) => void;
};
export function UserRoleMenu({ roles, onChange }: UserRoleMenuProps) {
	return (
		<MultiSelectMenu
			title="Roles"
			options={USER_ROLES}
			value={roles}
			onChange={onChange}
			clearLabel="Clear filters"
		/>
	);
}
