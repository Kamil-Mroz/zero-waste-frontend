import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { paginationSchema } from "@/features/shared/schemas/pagination.schema";
import type { Pageable } from "@/features/shared/types";
import { UsersDialog } from "@/features/users/components/user-dialog";
import { UserTable } from "@/features/users/components/user-table";
import { columns } from "@/features/users/hooks/columns";
import {
	userQueryOptions,
	usersQueryOptions,
} from "@/features/users/hooks/query-options";
import { withDefaultPageable } from "@/lib/utils";

const userParamsSchema = z.object({
	modal: z
		.enum(["create", "edit", "ban", "delete", "unban"])
		.optional()
		.catch("create"),
	userId: z.uuid().optional().catch(""),
});

const usersSearchSchema = z.object({
	...userParamsSchema.shape,
	...paginationSchema.shape,
});

export const Route = createFileRoute("/_authenticated/admin/users/")({
	component: RouteComponent,
	validateSearch: usersSearchSchema,
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ context, deps: { search } }) => {
		const pageable = withDefaultPageable(search);

		const page = await context.queryClient.ensureQueryData(
			usersQueryOptions(pageable),
		);

		if (page.totalPages > 0 && pageable.page >= page.totalPages) {
			throw redirect({
				to: "/admin/users",
				search: {
					...search,
					page: page.totalPages - 1,
				},
				replace: true,
			});
		}
		if (search.modal === "edit" && search.userId) {
			await context.queryClient.ensureQueryData(
				userQueryOptions(search.userId),
			);
		}
	},
});

function RouteComponent() {
	const search = Route.useSearch();

	const routeId = "/_authenticated/admin/users/";
	const { setFilters } = useFilters(routeId);

	const pageable = withDefaultPageable(search);

	const { data: page } = useSuspenseQuery(usersQueryOptions(pageable));
	return (
		<div>
			<UserTable
				columns={columns}
				data={page.content}
				pagination={{
					pageIndex: pageable.page,
					pageSize: pageable.size,
				}}
				paginationOptions={{
					pageCount: page.totalPages,
					onPaginationChange: (pagination) => {
						let paginationState: Pageable;
						if (typeof pagination === "function") {
							const paginationValue = pagination({
								pageIndex: pageable.page,
								pageSize: pageable.size,
							});

							paginationState = {
								page: paginationValue.pageIndex,
								size: paginationValue.pageSize,
							};
						} else {
							paginationState = {
								page: pagination.pageIndex,
								size: pagination.pageSize,
							};
						}
						setFilters(paginationState);
					},
				}}
			/>
			<UsersDialog />
		</div>
	);
}
