import {
	type ColumnDef,
	getCoreRowModel,
	type PaginationOptions,
	type PaginationState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/features/shared/components/ui/data-table";
import { DataTablePagination } from "@/features/shared/components/ui/data-table-pagination";
import { UserTableToolbar } from "@/features/users/components/user-table-toolbar";
import { setSelectedIds, useTableStore } from "../store";

type UserTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: PaginationState;
	paginationOptions: Pick<
		PaginationOptions,
		"onPaginationChange" | "pageCount"
	>;
};

export function UserTable<TData, TValue>({
	columns,
	data,
	pagination,
	paginationOptions,
}: UserTableProps<TData, TValue>) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		Expiration: false,
	});
	const [rowSelection, setRowSelection] = useState({});

	const clearSelectionTrigger = useTableStore((s) => s.clearSelectionTrigger);

	// biome-ignore lint/correctness/useExhaustiveDependencies: To clear the selection of the rows
	useEffect(() => {
		setRowSelection({});
	}, [clearSelectionTrigger]);

	const table = useReactTable({
		data,
		columns,
		getRowId: (row) => (row as { id: string }).id,

		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(rowSelection) : updater;
			setRowSelection(next);

			const ids = Object.keys(next).filter((id) => next[id]);
			setSelectedIds(ids);
		},
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		autoResetPageIndex: false,

		state: {
			columnVisibility,
			rowSelection,
			pagination,
		},
		...paginationOptions,
	});

	return (
		<div>
			<UserTableToolbar table={table} />
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
}
