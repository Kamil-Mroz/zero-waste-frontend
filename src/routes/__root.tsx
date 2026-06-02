import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import "../styles.css";
import type { QueryClient } from "@tanstack/react-query";
import type { AuthState } from "@/features/auth/types";
import { MainLayout } from "@/features/shared/components/main-layout";
import { Toaster } from "@/features/shared/components/ui/sonner";
import { queryClient } from "@/main";

interface MyRouterContext {
	auth: AuthState;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<MainLayout>
				<Outlet />
			</MainLayout>
			<Toaster  />
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
					{
						name: "TanStack Query",
						render: <ReactQueryDevtoolsPanel client={queryClient} />,
					},
					formDevtoolsPlugin(),
				]}
			/>
		</>
	);
}
