import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { DataTable } from "@/features/shared/components/ui/data-table";
import { UsersDialog } from "@/features/users/components/users-dialog";
import { columns } from "@/features/users/hooks/columns";
import {
	userQueryOptions,
	usersQueryOptions,
} from "@/features/users/hooks/query-options";

export const userParamsSchema = z.object({
	modal: z
		.enum(["create", "edit", "ban", "delete", "unban"])
		.optional()
		.catch("create"),
	userId: z.uuid().optional().catch(""),
});
export const Route = createFileRoute("/_authenticated/admin/users/")({
	component: RouteComponent,
	validateSearch: userParamsSchema,
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ context, deps: { search } }) => {
		if (search.modal === "edit" && search.userId) {
			await Promise.all([
				context.queryClient.ensureQueryData(usersQueryOptions()),
				context.queryClient.ensureQueryData(userQueryOptions(search.userId)),
			]);
		} else {
			await context.queryClient.ensureQueryData(usersQueryOptions());
		}
	},
});

function RouteComponent() {
	const { data: users } = useSuspenseQuery(usersQueryOptions());
	return (
		<div>
			<DataTable columns={columns} data={users} />
			<UsersDialog />
		</div>
	);
}
