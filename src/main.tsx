import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeProvider } from "@/features/shared/components/theme-provider";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import WebsocketProvider from "./features/webSocket/components/websocket-provider";
import { queryClient, router } from "./router";

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
