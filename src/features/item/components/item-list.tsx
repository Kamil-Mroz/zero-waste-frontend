import { Link } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import { Button } from "@/features/shared/components/ui/button";
import type { ItemListProps } from "../types";
import { ItemCard } from "./item-card";

export function ItemList({ items, isOwnItems }: ItemListProps) {
	return (
		<>
			{items.length === 0 ? (
				<EmptyComponent
					title="No items"
					description="No items listed yet."
					icon={Box}
				>
					{isOwnItems && (
						<Button asChild>
							<Link to="/marketplace/create">Add item</Link>
						</Button>
					)}
				</EmptyComponent>
			) : (
				<div className="w-full mx-auto sm:grid-cols-2 grid gap-4 lg:grid-cols-3 items-stretch">
					{items.map((item) => (
						<ItemCard item={item} key={item.id} />
					))}
				</div>
			)}
		</>
	);
}
