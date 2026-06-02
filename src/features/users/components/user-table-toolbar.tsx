import { Link } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";
import { DebouncedInput } from "@/features/shared/components/debounced-input";
import { Field } from "@/features/shared/components/ui/field";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { Button } from "../../shared/components/ui/button";
import { DataTableViewOptions } from "../../shared/components/ui/data-table-view-options";
import { Separator } from "../../shared/components/ui/separator";
import { clearSelection, useTableStore } from "../store";
import type { Roles } from "../types";
import { UserRoleMenu } from "./user-role-menu";

type DataTableToolbarProps<TData> = {
	table: Table<TData>;
};

export function UserTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const selectedIds = useTableStore((s) => s.selectedIds);
	const hasSelected = selectedIds.length > 0;

	const { filters, setFilters, resetFilters, clearFilters } = useFilters(
		"/_authenticated/admin/users/",
	);
	const hasSearch =
		!!filters.text || (!!filters.roles && filters.roles.length > 0);

	const onTextChange = (value: string | number) => {
		setFilters({ text: `${value}` });
	};
	const onRoleChange = (roles: Roles[]) => {
		if (roles.length === 0) clearFilters(["roles"]);
		else setFilters({ roles: roles });
	};

	return (
		<div className="flex items-center mb-2 flex-col lg:flex-row justify-center lg:justify-normal w-full gap-2">
			<Field className="w-auto">
				<DebouncedInput
					placeholder="Search..."
					value={filters.text ?? ""}
					onChange={onTextChange}
					className="max-w-62.5 p-2"
				/>
			</Field>

			<UserRoleMenu roles={filters.roles ?? []} onChange={onRoleChange} />
			{(hasSelected || hasSearch) && (
				<Button
					onClick={() => {
						if (hasSelected) clearSelection();
						if (hasSearch) resetFilters();
					}}
					variant="outline"
				>
					Clear <X />
				</Button>
			)}

			<div className="flex flex-col flex-wrap gap-2 lg:flex-row items-center lg:ml-auto">
				{hasSelected && (
					<>
						<div className="flex gap-2 flex-wrap justify-center">
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
						<Separator orientation={"horizontal"} className="block lg:hidden" />
						<Separator orientation={"vertical"} className="hidden lg:block" />
					</>
				)}
				<DataTableViewOptions table={table} />
				<Button asChild>
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
