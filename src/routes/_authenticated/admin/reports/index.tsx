import { createFileRoute } from "@tanstack/react-router";
import { reportsQueryOptions } from "@/features/report/hooks/query-options";

export const Route = createFileRoute("/_authenticated/admin/reports/")({
	beforeLoad: async ({ context }) => {
		if (context.auth.hasRole("DEMO")) {
			return;
		}
		await context.queryClient.ensureQueryData(reportsQueryOptions());
	},
});
