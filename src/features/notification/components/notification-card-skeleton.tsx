import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
export function NotificationCardSkeleton() {
	return (
		<Card className="">
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<Skeleton className="size-5 mt-1 rounded-full" />

					<div className="flex-1 space-y-2">
						<div className="flex items-center justify-between gap-4">
							<Skeleton className="h-5 w-full max-w-48" />
							<Skeleton className="h-3 w-full max-w-20" />
						</div>

						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full max-w-3/4" />

						<Skeleton className="h-3 w-full max-w-24" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
