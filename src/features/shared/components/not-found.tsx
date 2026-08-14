import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function NotFound(props: NotFoundRouteProps) {
	return (
		<div className="grid place-content-center h-full text-center gap-2">
			<div className="flex items-center gap-1">
				<p className="text-4xl font-bold">404</p>
				<Separator orientation="vertical" className="w-0.5!" />
				<p className="text-lg  ">Page not found</p>
			</div>
			<Button asChild>
				<Link to="/marketplace" className="">
					Go home
				</Link>
			</Button>
		</div>
	);
}
