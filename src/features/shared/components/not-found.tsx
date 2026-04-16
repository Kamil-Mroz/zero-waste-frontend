import { Link } from "@tanstack/react-router";
import type { NotFoundProps } from "../types";
import { Button } from "./ui/button";

export function NotFound({ detail }: NotFoundProps) {
	return (
		<div className="grid place-content-center h-full text-center gap-2">
			<span className="text-7xl block">404</span>

			<span className="text-2xl">{detail ? detail : "Page not found"}</span>

			<Button asChild className="h-auto text-xl/relaxed">
				<Link to="/" className="">
					Go home
				</Link>
			</Button>
		</div>
	);
}
