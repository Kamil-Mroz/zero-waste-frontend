import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFound(props: NotFoundRouteProps) {
	return (
		<div className="grid place-content-center h-full text-center gap-2">
			<p className="text-4xl font-bold">404</p>
			<p className="text-lg">Page not found</p>
			<Button asChild>
				<Link to="/marketplace" className="">
					Go home
				</Link>
			</Button>
		</div>
	);
}
