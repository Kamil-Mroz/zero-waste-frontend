import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/features/shared/components/ui/button";
import { Checkbox } from "@/features/shared/components/ui/checkbox";
import { DataTableRowsActions } from "@/features/shared/components/ui/data-table-row-actions";
import type { User } from "../types";

export const columns: ColumnDef<User>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		id: "name",
		header: "Name",
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Button variant="link" asChild size="sm" className="text-foreground">
					<Link to="/admin/users/$userId" params={{ userId: user.id }}>
						{user.firstName} {user.lastName}
					</Link>
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone",
	},
	{
		accessorKey: "roles",
		header: "Roles",
		cell: ({ row }) => {
			const formatted = (row.getValue("roles") as User["roles"]).join(", ");
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "hasActiveBan",
		header: "Banned",
	},
	{
		id: "actions",
		cell: DataTableRowsActions,
	},
];
