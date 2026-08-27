import type { AnyFormApi } from "@tanstack/react-form";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import { ErrorComponent } from "./features/shared/components/error-component";
import { NotFound } from "./features/shared/components/not-found";
import { PendingComponent } from "./features/shared/components/pending";
import { appToast } from "./features/shared/components/toast";
import WebsocketProvider from "./features/webSocket/components/websocket-provider";
import { handleApiError } from "./lib/utils";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: (error, variables) => {
			const message = handleApiError(
				error,
				(variables as { form?: AnyFormApi }).form || undefined,
			);
			if (message) appToast.error({ description: message });
		},
	}),
	queryCache: new QueryCache({
		onError: (error) => {
			const message = handleApiError(error);
			if (message) appToast.error({ description: message });
		},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
			gcTime: 30 * 60 * 1000,
			retry: false,
		},
	},
});

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
					<TooltipProvider>
						<WebsocketProvider>
							<InnerApp />
						</WebsocketProvider>
					</TooltipProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}
