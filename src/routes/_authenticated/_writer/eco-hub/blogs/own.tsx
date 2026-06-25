import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/own",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button variant="success">
				<Link to="/eco-hub/blogs/create">Add blog</Link>
			</Button>
		</div>
	);
}
