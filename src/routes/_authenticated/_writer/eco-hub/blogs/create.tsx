import { createFileRoute } from "@tanstack/react-router";
import BlogForm from "@/features/blog/components/blog-form";
import GoBackButton from "@/features/shared/components/go-back-button";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/create",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid items-center h-full">
			<div className="space-y-2">
				<GoBackButton />
				<BlogForm />
			</div>
		</div>
	);
}
