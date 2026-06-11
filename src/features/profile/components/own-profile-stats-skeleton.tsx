import {
	Card,
	CardContent,
	CardHeader,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function OwnProfileStatsSkeleton() {
	return (
		<>
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-32" />
				</CardHeader>
				<CardContent className="space-y-2">
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-32" />
				</CardHeader>
				<CardContent className="space-y-2">
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-4 w-full" />
				</CardContent>
			</Card>
		</>
	);
}
