import {
	type ColumnDef,
	getCoreRowModel,
	type PaginationOptions,
	type PaginationState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/features/shared/components/ui/data-table";
import { DataTablePagination } from "@/features/shared/components/ui/data-table-pagination";

type OfferTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: PaginationState;
	paginationOptions: Pick<
		PaginationOptions,
		"onPaginationChange" | "pageCount"
	>;
};
function OfferTable<TData, TValue>({
	data,
	columns,
	pagination,
	paginationOptions,
}: OfferTableProps<TData, TValue>) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const table = useReactTable({
		data,
		columns,
		getRowId: (row) => (row as { id: string }).id,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		enableRowSelection: false,
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		autoResetPageIndex: false,

		state: {
			columnVisibility,
			pagination,
		},
		...paginationOptions,
	});
	return (
		<div>
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
}
export default OfferTable;
