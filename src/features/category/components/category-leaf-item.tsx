import { Button } from "@/features/shared/components/ui/button";
import type { CategoryLeafItemProps } from "../types";
import { CategoryActions } from "./category-actions";

export function CategoryLeafItem({ item, onDelete }: CategoryLeafItemProps) {
	return (
		<Button
			key={item.id}
			variant="ghost"
			size="sm"
			className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
			asChild
		>
			<div className="flex flex-1 w-full ">
				<span>{item.name}</span>
				<CategoryActions category={item} onDelete={onDelete} />
			</div>
		</Button>
	);
}
