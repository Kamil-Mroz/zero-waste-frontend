import type { ItemListProps } from "../types";
import { ItemCard } from "./item-card";

export function ItemLIst({ items }: ItemListProps) {
	return (
		<div className="max-w-5xl w-full mx-auto sm:grid-cols-2 p-4 grid gap-4 lg:grid-cols-3">
			{items.map((item) => (
				<ItemCard item={item} key={item.id} />
			))}
		</div>
	);
}
