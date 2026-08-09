import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import { DataTableSkeleton } from "@/features/shared/components/data-table-skeleton";
import { useFilters } from "@/features/shared/hooks/use-filters";

import type { Pageable } from "@/features/shared/types";
import { UsersDialog } from "@/features/users/components/user-dialog";
import { UserTable } from "@/features/users/components/user-table";
import { columns } from "@/features/users/hooks/columns";
import { usersQueryOptions } from "@/features/users/hooks/query-options";

import { withDefaultPageable } from "@/lib/utils";

export const Route = createLazyFileRoute("/_authenticated/admin/users/")({
	component: RouteComponent,
	pendingComponent: DataTableSkeleton,
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
