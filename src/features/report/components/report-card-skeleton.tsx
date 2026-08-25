import {
	Card,
	CardContent,
	CardHeader,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function ReportCardSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-start justify-between gap-4">
				<div className="w-full space-y-2">
					<Skeleton className="h-5 w-48" />
					<Skeleton className="h-4 w-32" />
				</div>

				<Skeleton className="h-6 w-20 shrink-0 rounded-full" />
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-9 w-full" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-9 w-full" />
					</div>
				</div>

				<div className="rounded-md border p-3">
					<Skeleton className="mb-2 h-3 w-28" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="mt-2 h-4 w-3/4" />
				</div>

				<div className="flex items-center justify-between border-t pt-4">
					<Skeleton className="h-4 w-28" />

					<div className="flex gap-2">
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-28" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
