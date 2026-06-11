import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function NotificationDetailSkeleton() {
	return (
		<div className="mx-auto w-full py-10">
			<Card>
				<CardHeader>
					<div className="flex items-start gap-3">
						<Skeleton className="size-6 rounded-full mt-1" />

						<div className="flex-1 space-y-2">
							<Skeleton className="h-7 w-72" />

							<div className="flex flex-col gap-2 sm:flex-row">
								<Skeleton className="h-5 w-28 rounded-full" />
								<Skeleton className="h-4 w-24" />
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</div>

					<div className="rounded-md border p-3 space-y-2">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-4 w-56" />
						<Skeleton className="h-4 w-32" />
					</div>
				</CardContent>

				<CardFooter className="flex justify-between">
					<Skeleton className="h-9 w-24" />
					<Skeleton className="h-9 w-32" />
				</CardFooter>
			</Card>
		</div>
	);
}
