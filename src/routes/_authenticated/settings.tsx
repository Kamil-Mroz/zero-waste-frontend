import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { connectionsQueryOptions } from "@/features/auth/hooks/query-options";

export const settingsRouteSchema = z.object({
	error: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/settings")({
	head: () => ({
		meta: [
			{
				title: "Settings",
			},
		],
	}),
	validateSearch: settingsRouteSchema,
	staticData: {
		getTitle: () => "Settings",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(connectionsQueryOptions());
	},
});
