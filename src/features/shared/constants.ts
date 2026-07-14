import {
	Frame,
	Leaf,
	LifeBuoy,
	MapIcon,
	PieChart,
	Send,
	Shield,
	ShoppingBag,
	User,
} from "lucide-react";
import type { Pageable } from "./types";

export const NAV_LINKS = {
	navMain: [
		{
			title: "Admin",
			url: "/admin/dashboard",
			icon: Shield,
			private: true,
			role: "ADMIN",
			isActive: false,
			items: [
				{
					title: "Dashboard",
					url: "/admin/dashboard",
				},
				{
					title: "Manage Users",
					url: "/admin/users",
				},
				{
					title: "Manage Listings",
					url: "/admin/listings",
				},
				{
					title: "Manage categories",
					url: "/admin/categories",
				},
				{
					title: "Manage Blog",
					url: "/admin/blog",
				},
				{
					title: "Manage Quizzes",
					url: "/admin/quizzes",
				},
				{
					title: "Reports",
					url: "/admin/reports",
				},
			],
		},
		{
			title: "Marketplace",
			url: "/marketplace",
			icon: ShoppingBag,
			isActive: false,
			items: [
				{
					title: "Browse Items",
					url: "/marketplace",
				},
				{
					title: "Create Listing",
					url: "/marketplace/create",
					private: true,
				},
				{
					title: "My Listings",
					url: "/marketplace/my-items",
					private: true,
				},
				{
					title: "Offers",
					url: "/offers/own",
					private: true,
				},
			],
		},
		{
			title: "Eco Hub",
			url: "/eco-hub",
			icon: Leaf,
			isActive: true,
			items: [
				{
					title: "Blogs",
					url: "/eco-hub/blogs",
				},
				{
					title: "My blogs",
					url: "/eco-hub/blogs/own",
					private: true,
					role: "WRITER",
				},
				{
					title: "Quizzes",
					url: "/eco-hub/quizzes",
				},
				{
					title: "My quizzes",
					url: "/eco-hub/quizzes/own",
					private: true,
					role: "WRITER",
				},
			],
		},
		{
			title: "Profile",
			url: "/profile/",
			icon: User,

			isActive: false,
			private: true,
			items: [
				{
					title: "My Profile",
					url: "/profile/",
				},
				{
					title: "Notifications",
					url: "/notifications",
				},
				{
					title: "My Activity",
					url: "/profile/activity",
				},
				{
					title: "Reviews",
					url: "/reviews/received",
				},
				{
					title: "Settings",
					url: "/profile/settings",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	],
};

export const PAGE_SIZES = [10, 20, 25, 30, 40, 50, 100];

export const DEFAULT_PAGEABLE: Pageable = {
	page: 0,
	size: PAGE_SIZES[1],
} as const;
