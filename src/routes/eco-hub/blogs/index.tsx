import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/blog-list";
import { blogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createFileRoute("/eco-hub/blogs/")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(blogsQueryOptions());
	},
});

function RouteComponent() {
	const { data: blogs } = useSuspenseQuery(blogsQueryOptions());
	return <BlogList blogs={blogs} />;
}
