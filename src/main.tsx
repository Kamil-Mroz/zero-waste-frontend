import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import { ErrorComponent } from "./features/shared/components/error-component";
import { NotFound } from "./features/shared/components/not-found";
import { PendingComponent } from "./features/shared/components/pending";
import WebsocketProvider from "./features/webSocket/components/websocket-provider";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultNotFoundComponent: NotFound,
	defaultErrorComponent: ErrorComponent,
	defaultPendingComponent: PendingComponent,
	context: {
		queryClient,
		auth: undefined!,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<WebsocketProvider>
						<TooltipProvider>
							<InnerApp />
						</TooltipProvider>
					</WebsocketProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}
