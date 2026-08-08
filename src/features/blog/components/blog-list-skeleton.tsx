/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton */
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { BlogCardSkeleton } from "./blog-card-skeleton";

export function BlogListSkeleton({
	showCreate = false,
}: {
	showCreate?: boolean;
}) {
	return (
		<section>
			<div className="mb-8 flex items-center justify-between flex-wrap gap-4">
				<div className="space-y-3">
					<Skeleton className="h-9 w-40" />
					<Skeleton className="h-4 w-[420px] max-w-full" />
					<Skeleton className="h-4 w-[360px] max-w-full" />
				</div>

				{showCreate ? <Skeleton className="h-10 w-32 rounded-md" /> : null}
			</div>

			<div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<BlogCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}
