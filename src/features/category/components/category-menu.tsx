import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/features/shared/components/ui/sheet";
import { flattenCategories } from "@/lib/utils";
import { categoryTreeQueryOptions } from "../hooks/query-options";
import { CategoryItem } from "./category-item";

type CategoryMenuProps = {
	onSelect: (id: string) => void;
	selectedCategoryId?: string;
};
export function CategoryMenu({
	onSelect,
	selectedCategoryId,
}: CategoryMenuProps) {
	const { data: categories } = useSuspenseQuery(categoryTreeQueryOptions());
	const [open, setIsOpen] = useState(false);

	const closeOnSelect = (id: string) => {
		onSelect(id);
		setIsOpen(false);
	};
	const flatCategories = useMemo(
		() => flattenCategories(categories),
		[categories],
	);
	const categoryMap = useMemo(() => {
		return new Map(
			flatCategories.map((category) => [category.id, category.name]),
		);
	}, [flatCategories]);

	const selectedCategoryName = selectedCategoryId
		? categoryMap.get(selectedCategoryId)
		: null;

	return (
		<Sheet open={open} onOpenChange={(open) => setIsOpen(open)}>
			<div>
				<SheetTrigger asChild>
					<Button
						variant={"outline"}
						className="h-full flex items-center gap-1"
						size="lg"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						Categories
						{selectedCategoryName ? (
							<Badge variant="outline">{selectedCategoryName}</Badge>
						) : null}
					</Button>
				</SheetTrigger>
			</div>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Categories</SheetTitle>
					<SheetDescription>
						Select a category go filter items out
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col items-start gap-1 px-1 overflow-y-auto mb-2">
					{categories.map((category) => (
						<CategoryItem
							category={category}
							key={category.id}
							onSelect={closeOnSelect}
						/>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
