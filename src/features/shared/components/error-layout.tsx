import { Link } from "@tanstack/react-router";
import type { ErrorLayoutProps } from "../types";
import { Button } from "./ui/button";

export function ErrorLayout({ children, reset }: ErrorLayoutProps) {
	return (
		<div className="grid place-items-center min-h-full">
			<div className=" flex flex-col gap-2">
				{children}
				<div className=" grid grid-cols-2 gap-2">
					<Button onClick={reset} variant="outline">
						Retry
					</Button>
					<Button asChild>
						<Link to="/marketplace">Go Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
