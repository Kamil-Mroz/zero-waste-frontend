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
};

export type ErrorLayoutProps = {
	reset: () => void;
} & PropsWithChildren;

export type Page<T> = {
	content: T;
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
};

export type Pageable = {
	page: number;
	size: number;
};
export type MultiSelectOption<T extends string> = {
	value: T;
	label: string;
};
