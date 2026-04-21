import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/features/shared/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/features/shared/components/ui/sidebar";
import type { NavItem } from "../types";

export function NavMain({ items }: { items: NavItem[] }) {
	const { user, hasRole } = useAuth();

	function canAccess(item: NavItem) {
		if (!user) {
			return !item.private;
		}
		if (hasRole("ADMIN")) {
			return true;
		}
		if (item.role && !hasRole(item.role)) {
			return false;
		}
		return true;
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					return canAccess(item) ? (
						<Collapsible key={item.title} asChild defaultOpen={item?.isActive}>
							<SidebarMenuItem>
								<SidebarMenuButton asChild tooltip={item.title}>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className="data-[state=open]:rotate-90">
												<ChevronRight />
												<span className="sr-only">Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => {
													return canAccess(subItem) ? (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<Link to={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													) : null;
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					) : null;
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
