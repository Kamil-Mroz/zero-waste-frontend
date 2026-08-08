/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton text*/
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function BlogDetailsSkeleton() {
	return (
		<article className=" max-w-4xl space-y-6">
			<div className="space-y-3">
				<Skeleton className="h-10 w-3/4" />
				<Skeleton className="h-5 w-48" />
			</div>

			<div className="space-y-3">
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} className="h-4 w-full" />
				))}
				<Skeleton className="h-4 w-2/3" />
			</div>
		</article>
	);
}
