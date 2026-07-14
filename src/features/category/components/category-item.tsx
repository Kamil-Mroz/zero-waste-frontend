import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/features/shared/components/ui/collapsible";
import type { CategoryItemProps } from "../types";

export function CategoryItem({ category, onSelect }: CategoryItemProps) {
	const hasChildren = category.children?.length > 0;
	if (hasChildren)
		return (
			<div className="w-full space-y-1">
				<Collapsible className="w-full" defaultOpen={true}>
					<div className="flex items-center w-full">
						<CollapsibleTrigger asChild>
							<Button variant="ghost" className="group" size="sm">
								<ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
							</Button>
						</CollapsibleTrigger>
						<Button
							variant="ghost"
							className="justify-start flex-1"
							size="sm"
							onClick={() => onSelect(category.id)}
						>
							{category.name}
						</Button>
					</div>
					<CollapsibleContent className="mt-1 ml-5">
						<div className="flex flex-col gap-1">
							{category.children.map((child) => (
								<CategoryItem
									key={child.id}
									category={child}
									onSelect={onSelect}
								/>
							))}
						</div>
					</CollapsibleContent>
				</Collapsible>
			</div>
		);
	return (
		<Button
			onClick={() => onSelect(category.id)}
			variant="ghost"
			size="sm"
			className="justify-start w-full"
		>
			{category.name}
		</Button>
	);
}
