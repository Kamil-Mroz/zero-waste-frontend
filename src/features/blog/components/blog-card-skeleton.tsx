import {
	Card,
	CardContent,
	CardHeader,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
export function BlogCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="space-y-3">
					<Skeleton className="h-7 w-4/5" />
					<Skeleton className="h-7 w-2/3" />
				</div>

				<div className="mt-4 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</CardHeader>

			<CardContent>
				<Skeleton className="h-4 w-40" />
			</CardContent>
		</Card>
	);
}
