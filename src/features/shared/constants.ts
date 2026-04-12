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

export const NAV_LINKS = {
	navMain: [
		{
			title: "Marketplace",
			url: "/marketplace",
			icon: ShoppingBag,
			isActive: true,
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
					title: "Wishlist",
					url: "/marketplace/wishlist",
					private: true,
				},
				{
					title: "History",
					url: "/marketplace/history",
					private: true,
				},
			],
		},
		{
			title: "Eco Hub",
			url: "/eco",
			icon: Leaf,
			items: [
				{
					title: "Blog",
					url: "/eco/blog",
				},
				{
					title: "Quizzes",
					url: "/eco/quizzes",
				},
				{
					title: "My Progress",
					url: "/eco/progress",
					private: true,
				},
			],
		},

		{
			title: "Profile",
			url: "/profile",
			icon: User,
			private: true,
			items: [
				{
					title: "My Profile",
					url: "/profile",
				},
				{
					title: "My Activity",
					url: "/profile/activity",
				},
				{
					title: "Saved Items",
					url: "/profile/saved",
				},
				{
					title: "Settings",
					url: "/profile/settings",
				},
			],
		},
		{
			title: "Admin",
			url: "/dashboard",
			icon: Shield,
			private: true,
			role: "ADMIN",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
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
					url: "/categories",
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
