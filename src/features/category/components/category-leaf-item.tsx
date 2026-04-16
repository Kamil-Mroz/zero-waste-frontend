import type { CategoryLeafItemProps } from "../types";
import { CategoryActions } from "./category-actions";

export function CategoryLeafItem({ item, onDelete }: CategoryLeafItemProps) {
	return (
		<div className="group flex gap-1 items-center">
			<p className="flex-1 group-hover:bg-accent transition-colors px-2 rounded-sm  group-focus-visible:bg-accent group-[&:has(:focus)]:bg-accent">
				{item.name}
			</p>
			<CategoryActions category={item} onDelete={onDelete} />
		</div>
	);
}
