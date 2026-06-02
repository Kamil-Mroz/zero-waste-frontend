import { Bell, SidebarIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import NotificationPopup from "@/features/notification/components/notification-popup";
import { ModeToggle } from "@/features/shared/components/mode-toggle";
import { Button } from "@/features/shared/components/ui/button";
import { Separator } from "@/features/shared/components/ui/separator";
import { useSidebar } from "@/features/shared/components/ui/sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";

function Header() {
	const { toggleSidebar } = useSidebar();

	const { user } = useAuth();
	return (
		<header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
			<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
				<Button
					className="h-8 w-8"
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
				>
					<SidebarIcon />
				</Button>
				<Separator orientation="vertical" className="mr-2" />
				<ModeToggle />
				<Separator orientation="vertical" className="mx-2" />
				<AppBreadcrumb />

				{user && <NotificationPopup />}
				{/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
			</div>
		</header>
	);
}
export default Header;
