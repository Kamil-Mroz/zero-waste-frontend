/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton */
import { ItemCardSkeleton } from "./item-card-skeleton";

export function ItemsListSkeleton() {
	return (
		<div className="w-full mx-auto sm:grid-cols-2 grid gap-4 lg:grid-cols-3 items-stretch">
			{Array.from({ length: 6 }).map((_, i) => (
				<ItemCardSkeleton key={i} />
			))}
		</div>
	);
}
