import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function ItemCardSkeleton() {
	return (
		<Card className="rounded-2xl max-w-sm mx-auto w-full border relative overflow-hidden">
			<CardContent className="px-4 space-y-3">
				{/* badge row */}
				<div className="flex justify-between items-center">
					<Skeleton className="h-5 w-20 rounded-full" />
					<Skeleton className="h-5 w-16 rounded-full" />
				</div>

				{/* image */}
				<Skeleton className="h-40 w-full rounded-xl" />

				{/* title */}
				<div className="flex justify-between items-start gap-2">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-4 w-16" />
				</div>

				{/* description */}
				<div className="space-y-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-5/6" />
				</div>

				{/* footer */}
				<div className="flex justify-between items-center pt-2">
					<Skeleton className="h-3 w-16" />
					<Skeleton className="h-3 w-20" />
				</div>

				{/* button */}
				<div className="pt-4">
					<Skeleton className="h-9 w-full rounded-md" />
				</div>
			</CardContent>
		</Card>
	);
}
