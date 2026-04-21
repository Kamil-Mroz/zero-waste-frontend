import type { CategoryTreeItemProps } from "../types";
import { CategoryBranchItem } from "./category-branch-item";
import { CategoryLeafItem } from "./category-leaf-item";

export function CategoryTreeItem({ item }: CategoryTreeItemProps) {
	if (item.children.length > 0) {
		return <CategoryBranchItem item={item} />;
	}
	return <CategoryLeafItem item={item}  />;
}
