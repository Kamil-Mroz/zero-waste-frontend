import type { MultiSelectOption } from "../shared/types";
import type { Roles } from "./types";

export const USER_QUERY_KEYS = {
	all: ["users"],
	byId: (id: string) => [...USER_QUERY_KEYS.all, "detail", id],
} as const;

export const USER_ROLES = [
	{ label: "Admin", value: "ADMIN" },
	{ label: "User", value: "USER" },
	{ label: "Writer", value: "WRITER" },
] as const;

export const usersDialogConfig = {
	create: {
		title: "Create User",
		description:
			"Create a new user account and assign roles, contact details, and login credentials.",
	},
	edit: {
		title: "Update User",
		description:
			"Update the selected user's profile information, roles, or password.",
	},
	ban: {
		title: "Ban User(s)",
		description:
			"Restrict user's access temporarily or permanently and provide a reason if required.",
	},
	delete: {
		title: "Delete User(s)",
		description:
			"Permanently delete user account. This action cannot be undone.",
	},
	unban: {
		title: "Unban User(s)",
		description: "Revoke restriction applied on accounts and provide a reason",
	},

	empty: {
		title: "",
		description: "",
	},
} as const;

export const roleOptions: MultiSelectOption<Roles>[] = [
	{ value: "ADMIN", label: "Admin" },
	{ value: "WRITER", label: "Writer" },
	{ value: "USER", label: "User" },
] as const;
