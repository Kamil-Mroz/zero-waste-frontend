/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton */
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function ItemDetailSkeleton() {
	return (
		<div className="max-w-2xl w-full grid gap-2 place-items-start mx-auto p-4">
			<Skeleton className="h-9 w-24" />

			<Card className="w-full rounded-2xl">
				<CardContent className="p-6 space-y-4">
					<Skeleton className="h-8 w-2/3" />

					<div className="space-y-3">
						<Skeleton className="aspect-square w-full max-w-sm rounded-2xl mx-auto" />

						<div className="flex gap-2 overflow-hidden">
							{Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} className="h-20 w-20 shrink-0 rounded-lg" />
							))}
						</div>
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-4 w-36" />
					</div>

					<div className="border-t pt-4 space-y-2">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-4 w-52" />
					</div>

					<div className="flex gap-2 pt-2">
						<Skeleton className="h-10 w-32" />
						<Skeleton className="h-10 w-32" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
