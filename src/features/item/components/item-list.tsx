import type { ItemListProps } from "../types";
import { ItemCard } from "./item-card";

export function ItemList({ items }: ItemListProps) {
	return (
		<div className="w-full mx-auto sm:grid-cols-2 grid gap-4 lg:grid-cols-3 items-stretch">
			{items.map((item) => (
				<ItemCard item={item} key={item.id} />
			))}
		</div>
	);
}
