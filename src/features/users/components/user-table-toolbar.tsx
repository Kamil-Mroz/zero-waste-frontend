import { Link } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "../../shared/components/ui/button";
import { DataTableViewOptions } from "../../shared/components/ui/data-table-view-options";
import { Separator } from "../../shared/components/ui/separator";
import { useIsMobile } from "../../shared/hooks/use-mobile";
import { clearSelection, useTableStore } from "../store";

type DataTableToolbarProps<TData> = {
	table: Table<TData>;
};

export function UserTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const selectedIds = useTableStore((s) => s.selectedIds);
	const hasSelected = selectedIds.length > 0;

	const isMobile = useIsMobile();

	return (
		<div className="flex items-center py-4 xl:flex-row justify-center sm:justify-end">
			<div className="flex flex-col flex-wrap gap-2 sm:flex-row items-center justify-end ">
				{hasSelected && (
					<>
						<div className="flex gap-2 flex-wrap justify-center">
							<Button onClick={clearSelection} size="sm" variant="outline">
								Clear
							</Button>
							<Button variant="secondary" size="sm" asChild>
								<Link
									to="/admin/users"
									search={(prev) => ({ ...prev, modal: "unban" })}
								>
									Unban
								</Link>
							</Button>

							<Button size="sm" asChild>
								<Link
									to="/admin/users"
									search={(prev) => ({ ...prev, modal: "ban" })}
								>
									Ban
								</Link>
							</Button>

							<Button variant="destructive" size="sm" asChild>
								<Link
									to="/admin/users"
									search={(prev) => ({ ...prev, modal: "delete" })}
								>
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
					<Link
						to="/admin/users"
						search={(prev) => ({ ...prev, modal: "create" })}
					>
						<Plus />
						<span className="sr-only">Add user</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
