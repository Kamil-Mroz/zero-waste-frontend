import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/features/shared/components/ui/button";
import { Checkbox } from "@/features/shared/components/ui/checkbox";
import { DataTableColumnHeader } from "@/features/shared/components/ui/data-table-column-header";
import { UserTableRowsActions } from "@/features/users/components/user-table-row-actions";
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
		id: "nickname",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nickname" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Button
					variant="link"
					asChild
					size="sm"
					className="pl-0 text-foreground"
				>
					<Link to="/admin/users/$userId" params={{ userId: user.id }}>
						{user.nickname}
					</Link>
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		// cell: ({ row }) => {
		// 	return <div>{row.getValue("role")}</div>;
		// },
	},
	{
		id: "Banned",
		accessorKey: "hasActiveBan",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Banned" />
		),
	},
	{
		id: "Expiration",
		accessorKey: "bannedUntil",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Ban expiration" />
		),
	},
	{
		id: "actions",
		cell: UserTableRowsActions,
	},
];
