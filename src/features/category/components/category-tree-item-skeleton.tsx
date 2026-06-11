/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton*/

import { ChevronRightIcon } from "lucide-react";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function CategoryTreeItemSkeleton({
	childrenCount,
}: {
	childrenCount: number;
}) {
	return (
		<div>
			<div className="flex items-center gap-2 py-1">
				<ChevronRightIcon className="h-4 w-4 opacity-30" />

				<Skeleton className="h-4 w-40" />

				<div className="ml-auto flex gap-2">
					<Skeleton className="h-6 w-6 rounded" />
					<Skeleton className="h-6 w-6 rounded" />
				</div>
			</div>

			<div className="ml-4 space-y-1">
				{Array.from({ length: childrenCount }).map((_, i) => (
					<CategoryTreeItemSkeleton
						key={i}
						childrenCount={Math.max(0, childrenCount - 1)}
					/>
				))}
			</div>
		</div>
	);
}
