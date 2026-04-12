import type { LucideIcon } from "lucide-react";
import type { Roles } from "../auth/types";

export type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	private?: boolean;
	role?: Roles;
	items: NavItem[];
};
