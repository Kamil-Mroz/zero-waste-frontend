import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import "../styles.css";
import type { AuthState } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

interface MyRouterContext {
	auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackDevtools
				config={{
					position: "bottom-right",
					defaultOpen: false,
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					formDevtoolsPlugin(),
				]}
			/>
		</>
	);
}
