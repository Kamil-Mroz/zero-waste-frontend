/** biome-ignore-all lint/suspicious/noArrayIndexKey: Used for skeleton */
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function ReviewsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Reviews</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="flex gap-3 border-b pb-4">
						<Skeleton className="h-10 w-10 rounded-full" />

						<div className="flex-1 space-y-2">
							<div className="flex justify-between">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>

							<div className="flex gap-1">
								{Array.from({ length: 5 }).map((_, j) => (
									<Skeleton key={j} className="h-3 w-3" />
								))}
							</div>

							<Skeleton className="h-3 w-full" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
