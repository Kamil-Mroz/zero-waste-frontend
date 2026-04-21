import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { Roles } from "../users/types";

export type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	private?: boolean;
	role?: Roles;
	items: NavItem[];
};

export type EmptyComponentProps = {
	title: string;
	description: string;
	icon: LucideIcon;
	linkTo?: string;
	linkLabel?: string;
};

export type ErrorLayoutProps = {
	reset: () => void;
} & PropsWithChildren;
