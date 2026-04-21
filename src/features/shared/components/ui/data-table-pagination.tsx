import type { Table } from "@tanstack/react-table";

type DataTablePaginationProps<TData> = {
	table: Table<TData>;
};
export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex flex-col items-center justify-between gap-2 px-2 sm:flex-row">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div>Pagination</div>
		</div>
	);
}
