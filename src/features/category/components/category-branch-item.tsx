import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/features/shared/components/ui/collapsible";
import type { CategoryTreeItemProps } from "../types";
import { CategoryActions } from "./category-actions";
import { CategoryTreeItem } from "./category-tree-item";

export function CategoryBranchItem({ item, onDelete }: CategoryTreeItemProps) {
	return (
		<Collapsible key={item.id} defaultOpen={true}>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
					asChild
				>
					<div className="flex items-center flex-1 w-full gap-1">
						<ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
						<span>{item.name}</span>
						<CategoryActions category={item} onDelete={onDelete} />
					</div>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="mt-1 ml-5 style-lyra:ml-4">
				<div className="flex flex-col gap-1">
					{item.children.map((child) => (
						<CategoryTreeItem onDelete={onDelete} key={item.id} item={child} />
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
