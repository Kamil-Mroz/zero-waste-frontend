import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { redirectSchema } from "@/features/shared/schemas/redirect.schema";

export const Route = createFileRoute("/unauthorized")({
	validateSearch: redirectSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const { redirect } = Route.useSearch();
	const { auth } = Route.useRouteContext();
	return (
		<div className="h-full grid place-items-center ">
			<div className="max-w-md w-full border shadow-lg rounded-lg p-8 text-center">
				<div className="mb-6">
					<div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Error sign</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
				</div>

				<h1 className="text-2xl font-bold  mb-4">Access Denied</h1>

				<div className="mb-6 text-sm text-muted-foreground">
					<p>
						<strong>Your roles:</strong>{" "}
						{(auth.user && Array.from(auth.user.roles).join(", ")) || "None"}
					</p>
				</div>

				<div className="space-y-3">
					<Button asChild className="w-full ">
						<Link to="/">Go Home</Link>
					</Button>

					<Button variant="secondary" className="w-full ">
						<Link to={redirect}>Try Again</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
