import { Link } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import { Separator } from "./separator";

type DataTableToolbarProps<TData> = {
	table: Table<TData>;
};

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const selectedRows = table.getFilteredSelectedRowModel().rows;
	const hasSelected = selectedRows.length > 0;

	const isMobile = useIsMobile();

	return (
		<div className="flex items-center py-4 xl:flex-row justify-center sm:justify-end">
			<div className="flex flex-col flex-wrap gap-2 sm:flex-row items-center justify-end ">
				{hasSelected && (
					<>
						<div className="flex gap-2 flex-wrap justify-center">
							<Button
								onClick={() => table.toggleAllRowsSelected(false)}
								size="sm"
								variant="outline"
							>
								Clear
							</Button>
							<Button variant="secondary" size="sm" asChild>
								<Link to="/admin/users" search={{ modal: "unban" }}>
									Unban
								</Link>
							</Button>

							<Button size="sm" asChild>
								<Link to="/admin/users" search={{ modal: "ban" }}>
									Ban
								</Link>
							</Button>

							<Button variant="destructive" size="sm" asChild>
								<Link to="/admin/users" search={{ modal: "delete" }}>
									Delete
								</Link>
							</Button>
						</div>
						{isMobile ? (
							<Separator orientation={"horizontal"} />
						) : (
							<Separator orientation={"vertical"} />
						)}
					</>
				)}
				<DataTableViewOptions table={table} />
				<Button size="sm" asChild>
					<Link to="/admin/users" search={{ modal: "create" }}>
						<Plus />
						<span className="sr-only">Add user</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
