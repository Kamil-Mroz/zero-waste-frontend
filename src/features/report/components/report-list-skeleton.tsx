/** biome-ignore-all lint/suspicious/noArrayIndexKey: used to render skeleton */
import { ReportCardSkeleton } from "./report-card-skeleton";

export function ReportListSkeleton() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 3 }).map((_, id) => (
				<ReportCardSkeleton key={id} />
			))}
		</div>
	);
}
