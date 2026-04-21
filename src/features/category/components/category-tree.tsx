import type { CategoryTreeProps } from "../types";
import { CategoryTreeItem } from "./category-tree-item";

export function CategoryTree({ items }: CategoryTreeProps) {
	return (
		<div className="flex flex-col gap-1">
			{items.map((category) => (
				<CategoryTreeItem key={category.id} item={category} />
			))}
		</div>
	);
}
