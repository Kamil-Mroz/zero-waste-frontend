import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryDialog } from "@/features/category/components/category-dialog";
import { CategoryList } from "@/features/category/components/category-list";
import {
	categoriesQueryOptions,
	categoryQueryOptions,
	categoryTreeQueryOptions,
} from "@/features/category/hooks/query-options";
import { categorySearchSchema } from "@/features/category/schemas/category.schema";
import { PendingComponent } from "@/features/shared/components/pending";

export const Route = createFileRoute("/_authenticated/admin/categories/")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "List",
	},

	validateSearch: categorySearchSchema,
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ context, deps: { search } }) => {
		if (search.modal === "edit" && search.categoryId) {
			await Promise.all([
				context.queryClient.ensureQueryData(categoryTreeQueryOptions()),
				context.queryClient.ensureQueryData(
					categoryQueryOptions(search.categoryId),
				),
				context.queryClient.ensureQueryData(categoriesQueryOptions()),
			]);
		} else {
			await context.queryClient.ensureQueryData(categoryTreeQueryOptions());
		}
	},
	pendingComponent: PendingComponent,
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
