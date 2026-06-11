import { Link } from "@tanstack/react-router";
import { LayoutGrid, Plus } from "lucide-react";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/features/shared/components/ui/card";
import type { CategoryListProps } from "../types";
import { CategoryTree } from "./category-tree";

export function CategoryList({ categories }: CategoryListProps) {
	if (categories.length === 0) {
		return (
			<EmptyComponent
				title="No categories"
				description="
					Categories are need to create an item
				"
				icon={LayoutGrid}
			>
				<Button asChild>
					<Link to="/admin/categories" search={{ modal: "create" }}>
						Add category
					</Link>
				</Button>
			</EmptyComponent>
		);
	}

	return (
		<Card className=" w-full gap-2" size="sm">
			<CardHeader>
				<Button asChild>
					<Link to="/admin/categories" search={{ modal: "create" }}>
						<Plus /> Add
					</Link>
				</Button>
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<CategoryTree items={categories} />
			</CardContent>
		</Card>
	);
}
