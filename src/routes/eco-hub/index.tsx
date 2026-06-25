import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createFileRoute("/eco-hub/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid gap-2 h-full">
			<Button
				asChild
				className="h-auto text-2xl border border-muted"
				variant="ghost"
			>
				<Link to="/eco-hub/blogs">Explore Blogs</Link>
			</Button>

			<Button
				asChild
				className="h-auto text-2xl border border-muted"
				variant="ghost"
			>
				<Link to="/eco-hub/quizzes">Explore Quizzes</Link>
			</Button>
		</div>
	);
}
