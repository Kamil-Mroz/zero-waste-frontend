/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton */
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/components/ui/table";
import { useIsMobile } from "../hooks/use-mobile";

type DataTableSkeletonProps = {
	columnCount?: number;
	rowCount?: number;
	showPagination?: boolean;
};

export function DataTableSkeleton({
	columnCount = 4,
	rowCount = 10,
	showPagination = true,
}: DataTableSkeletonProps) {
	const isMobile = useIsMobile();
	if (isMobile) {
		columnCount = 2;
	}
	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{Array.from({ length: columnCount }).map((_, index) => (
								<TableHead key={index}>
									<Skeleton className="h-4 max-w-24 w-full" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody>
						{Array.from({ length: rowCount }).map((_, rowIndex) => (
							<TableRow key={rowIndex}>
								{Array.from({ length: columnCount }).map((_, cellIndex) => (
									<TableCell key={cellIndex}>
										<Skeleton className="h-4 w-full max-w-[160px]" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{showPagination && (
				<div className="flex items-center justify-between gap-2">
					<div className="flex-1" />
					<Skeleton className="h-4 max-w-32 w-full" />

					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8" />
						{!isMobile && (
							<>
								<Skeleton className="h-8 w-8" />
								<Skeleton className="h-8 w-16" />
								<Skeleton className="h-8 w-8" />
							</>
						)}
						<Skeleton className="h-8 w-8" />
					</div>
				</div>
			)}
		</div>
	);
}
