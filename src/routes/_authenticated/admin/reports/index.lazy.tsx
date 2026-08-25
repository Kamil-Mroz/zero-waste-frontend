import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ReportList } from "@/features/report/components/report-list";
import { ReportListSkeleton } from "@/features/report/components/report-list-skeleton";
import { reportsQueryOptions } from "@/features/report/hooks/query-options";

export const Route = createLazyFileRoute("/_authenticated/admin/reports/")({
	pendingComponent: ReportListSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery(reportsQueryOptions());
	return <ReportList reports={data} />;
}
