import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CategoryDialog } from "@/features/category/components/category-dialog";
import { CategoryList } from "@/features/category/components/category-list";
import { CategoryTreeSkeleton } from "@/features/category/components/category-tree-skeleton";
import { categoryTreeQueryOptions } from "@/features/category/hooks/query-options";
export const Route = createLazyFileRoute("/_authenticated/admin/categories/")({
	component: RouteComponent,

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
