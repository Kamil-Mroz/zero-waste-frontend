/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton */
import { CategoryTreeItemSkeleton } from "./category-tree-item-skeleton";

export function CategoryTreeSkeleton() {
	const fakeTree = [0, 1, 2, 2, 1, 0];
	return (
		<div className="flex flex-col gap-1">
			{fakeTree.map((depth, i) => (
				<CategoryTreeItemSkeleton key={i} childrenCount={depth} />
			))}
		</div>
	);
}
