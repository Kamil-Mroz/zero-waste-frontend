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

export function CategoryBranchItem({ item }: CategoryTreeItemProps) {
	return (
		<Collapsible defaultOpen={true}>
			<div className="flex items-center">
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="group transition-none justify-start cursor-pointer flex-1"
					>
						<ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
						<span>{item.name}</span>
					</Button>
				</CollapsibleTrigger>

				<CategoryActions category={item} />
			</div>
			<CollapsibleContent className="mt-1 ml-5 ">
				<div className="flex flex-col gap-1">
					{item.children.map((child) => (
						<CategoryTreeItem key={child.id} item={child} />
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
