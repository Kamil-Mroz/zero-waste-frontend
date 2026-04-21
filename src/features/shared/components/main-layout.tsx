import type { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import Header from "./Header";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<Header />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset className="mx-auto container p-2">
						{children}
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
