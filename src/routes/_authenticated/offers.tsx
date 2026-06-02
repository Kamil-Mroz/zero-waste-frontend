import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createFileRoute("/_authenticated/offers")({
	component: RouteComponent,

	staticData: {
		getTitle: () => "Offers",
	},
});

function RouteComponent() {
	return (
		<div className="grid gap-2">
			<div className="flex gap-1 items-center justify-center">
				<Link to="/offers/own">
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Own</Button>
					)}
				</Link>
				<Link to="/offers/received">
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Received</Button>
					)}
				</Link>
			</div>
			<Outlet />
		</div>
	);
}
