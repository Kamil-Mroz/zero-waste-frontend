import type { MultiSelectOption } from "../shared/types";
import type { Roles } from "./types";

export const USER_QUERY_KEYS = {
	all: ["users"],
	byId: (id: string) => [...USER_QUERY_KEYS.all, "detail", id],
} as const;

export const usersDialogConfig = {
	create: {
		title: "Create User",
		description:
			"Create a new user account and assign role, contact details, and login credentials.",
	},
	edit: {
		title: "Update User",
		description:
			"Update the selected user's profile information, role, or password.",
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

export const USER_ROLES: MultiSelectOption<Roles>[] = [
	{ label: "Admin", value: "ADMIN" },
	{ label: "User", value: "USER" },
	{ label: "Writer", value: "WRITER" },
	{ label: "Demo", value: "DEMO" },
] as const;
