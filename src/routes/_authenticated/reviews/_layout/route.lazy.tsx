import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";
import GoBackButton from "@/features/shared/components/go-back-button";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createLazyFileRoute("/_authenticated/reviews/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-2">
			<nav className="flex justify-center gap-4 ">
				<Link to="/reviews/received" replace={true}>
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Received</Button>
					)}
				</Link>
				<Link to="/reviews/given" replace={true}>
					{({ isActive }) => (
						<Button variant={isActive ? "default" : "outline"}>Given</Button>
					)}
				</Link>
			</nav>
			<GoBackButton />
			<Outlet />
		</div>
	);
}
