import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import { RouteError } from "./features/shared/components/error-component";
import { ErrorLayout } from "./features/shared/components/error-layout";
import { NotFound } from "./features/shared/components/not-found";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultNotFoundComponent: () => <NotFound />,
	defaultErrorComponent: ({ error, reset }) => (
		<ErrorLayout reset={reset}>
			<RouteError error={error} />
		</ErrorLayout>
	),
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
						<InnerApp />
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
