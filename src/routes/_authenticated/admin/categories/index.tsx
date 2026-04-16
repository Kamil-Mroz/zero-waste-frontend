import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/features/category/components/category-list";
import { categoryTreeQueryOptions } from "@/features/category/hooks/query-options";
import { PendingComponent } from "@/features/shared/components/pending";

export const Route = createFileRoute("/_authenticated/admin/categories/")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "List",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(categoryTreeQueryOptions());
	},
	pendingComponent: PendingComponent,
});

function RouteComponent() {
	const { data: categories } = useSuspenseQuery(categoryTreeQueryOptions());

	return <CategoryList categories={categories} />;
}
