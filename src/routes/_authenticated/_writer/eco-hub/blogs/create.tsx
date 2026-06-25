import { createFileRoute } from "@tanstack/react-router";
import CreateBlogForm from "@/features/blog/components/create-blog-form";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/create",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<CreateBlogForm />
		</div>
	);
}
