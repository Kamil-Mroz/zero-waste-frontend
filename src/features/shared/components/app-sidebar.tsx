import { Link } from "@tanstack/react-router";
import { Command, LogIn } from "lucide-react";
import type * as React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { NavMain } from "@/features/shared/components/nav-main";
import { NavUser } from "@/features/shared/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/features/shared/components/ui/sidebar";
import { NAV_LINKS } from "../constants";
import { useIsMobile } from "../hooks/use-mobile";
import type { NavItem } from "../types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();

	const { toggleSidebar } = useSidebar();
	const isMobile = useIsMobile();

	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link
								to="/"
								onClick={() => {
									if (isMobile) toggleSidebar();
								}}
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Zero waste</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={NAV_LINKS.navMain as NavItem[]} />
				{/* <NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				{user ? (
					<NavUser user={user} />
				) : (
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild>
								<Link
									to="/login"
									onClick={() => {
										if (isMobile) toggleSidebar();
									}}
								>
									<LogIn />
									Login
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
