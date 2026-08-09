import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createLazyFileRoute("/_authenticated/offers")({
	component: RouteComponent,

});

function RouteComponent() {
	return (
		<div className="grid gap-2">
			<nav className="flex gap-1 items-center justify-center">
				<Link to="/offers/own" replace={true}>
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Own</Button>
					)}
				</Link>
				<Link to="/offers/received" replace={true}>
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Received</Button>
					)}
				</Link>
			</nav>
			<Outlet />
		</div>
	);
}
