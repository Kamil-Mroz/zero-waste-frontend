import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ReportList } from "@/features/report/components/report-list";
import { reportsQueryOptions } from "@/features/report/hooks/query-options";

export const Route = createLazyFileRoute("/_authenticated/admin/reports/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery(reportsQueryOptions());
	return <ReportList reports={data} />;
}
