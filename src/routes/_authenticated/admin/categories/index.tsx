import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryDialog } from "@/features/category/components/category-dialog";
import { CategoryList } from "@/features/category/components/category-list";
import { CategoryTreeSkeleton } from "@/features/category/components/category-tree-skeleton";
import {
	categoriesQueryOptions,
	categoryQueryOptions,
	categoryTreeQueryOptions,
} from "@/features/category/hooks/query-options";
import { categorySearchSchema } from "@/features/category/schemas/category.schema";

export const Route = createFileRoute("/_authenticated/admin/categories/")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "List",
	},

	validateSearch: categorySearchSchema,
	loaderDeps: ({ search }) => ({
		modal: search.modal,
		categoryId: search.categoryId,
	}),
	loader: async ({ context, deps: { modal, categoryId } }) => {
		if (modal === "edit" && categoryId) {
			await Promise.all([
				context.queryClient.ensureQueryData(categoryTreeQueryOptions()),
				context.queryClient.ensureQueryData(categoryQueryOptions(categoryId)),
				context.queryClient.ensureQueryData(categoriesQueryOptions()),
			]);
		} else if (modal === "delete" && categoryId) {
			await Promise.all([
				context.queryClient.ensureQueryData(categoryTreeQueryOptions()),
				context.queryClient.ensureQueryData(categoryQueryOptions(categoryId)),
			]);
		} else {
			await context.queryClient.ensureQueryData(categoryTreeQueryOptions());
		}
	},
	pendingComponent: CategoryTreeSkeleton,
});

function RouteComponent() {
	const { data: tree } = useSuspenseQuery(categoryTreeQueryOptions());

	return (
		<div>
			<CategoryList categories={tree} />
			<CategoryDialog />
		</div>
	);
}
