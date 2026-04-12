import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/features/shared/components/ui/card";
import type { CategoryListProps } from "../types";
import { CategoryTree } from "./category-tree";

export function CategoryList({ categories }: CategoryListProps) {
	return (
		<div className="p-4">
			<Card className=" w-full gap-2" size="sm">
				<CardHeader>
					<Button asChild className="h-auto text-lg ">
						<Link to="/categories/create">
							<Plus /> Add
						</Link>
					</Button>
				</CardHeader>
				<CardContent>
					<CategoryTree items={categories} />
				</CardContent>
			</Card>
		</div>
	);
}
