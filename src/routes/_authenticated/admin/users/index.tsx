import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";
import { DataTableSkeleton } from "@/features/shared/components/data-table-skeleton";
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
import { userParamsSchema } from "@/features/users/schemas/user.schema";
import { getValidPage, withDefaultPageable } from "@/lib/utils";

const usersSearchSchema = z.object({
	...userParamsSchema.shape,
	...paginationSchema.shape,
});

export const Route = createFileRoute("/_authenticated/admin/users/")({
	component: RouteComponent,
	pendingComponent: DataTableSkeleton,
	validateSearch: usersSearchSchema,
	loaderDeps: ({ search }) => {
		const { modal, page, roles, size, text, userId } = search;
		return { modal, page, roles, size, text, userId };
	},
	loader: async ({ context, deps: search }) => {
		const { modal, userId, ...usersSearch } = search;
		const page = await context.queryClient.ensureQueryData(
			usersQueryOptions(usersSearch),
		);

		const correctPage = getValidPage(search.page, page.totalPages);
		if (correctPage) {
			throw redirect({
				to: ".",
				search: {
					...search,
					page: correctPage,
				},
				replace: true,
			});
		}
		if (modal === "edit" && userId) {
			await context.queryClient.ensureQueryData(userQueryOptions(userId));
		}
	},
});

function RouteComponent() {
	const { modal, userId, ...userSearch } = Route.useSearch();

	const routeId = "/_authenticated/admin/users/";
	const { setFilters } = useFilters(routeId);

	const pageable = withDefaultPageable(userSearch);

	const { data: page } = useSuspenseQuery(usersQueryOptions(userSearch));

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
