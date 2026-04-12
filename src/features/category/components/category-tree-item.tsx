import type { CategoryTreeItemProps } from "../types";
import { CategoryBranchItem } from "./category-branch-item";
import { CategoryLeafItem } from "./category-leaf-item";

export function CategoryTreeItem({ item, onDelete }: CategoryTreeItemProps) {
	if (item.children.length > 0) {
		return <CategoryBranchItem key={item.id} onDelete={onDelete} item={item} />;
	}
	return <CategoryLeafItem item={item} onDelete={onDelete} />;
}
