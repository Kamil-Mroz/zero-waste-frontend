import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/features/category/components/category-list";
import { categoryTreeQueryOptions } from "@/features/category/hooks/query-options";

export const Route = createFileRoute("/_authenticated/_admin/categories/")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "List",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(categoryTreeQueryOptions());
	},
});

function RouteComponent() {
	const { data: categories } = useSuspenseQuery(categoryTreeQueryOptions());

	return <CategoryList categories={categories} />;
}
