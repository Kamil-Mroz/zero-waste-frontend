import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { User } from "@/features/users/types";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";

type DataTableRowActionsProps<TData> = {
	row: Row<TData>;
};

export function DataTableRowsActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const id = (row.original as User).id;

	return (
		<>
			{/* Dialog prompt */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="size-8 data-[state=open]:bg-muted"
					>
						<MoreHorizontal />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem asChild>
						<Link to="/admin/users" search={{ modal: "edit", userId: id }}>
							Edit
						</Link>
					</DropdownMenuItem>
					{(row.original as User).hasActiveBan ? (
						<DropdownMenuItem asChild>
							<Link to="/admin/users" search={{ modal: "unban", userId: id }}>
								Unban
							</Link>
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem asChild>
							<Link to="/admin/users" search={{ modal: "ban", userId: id }}>
								Ban
							</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" asChild>
						<Link to="/admin/users" search={{ modal: "delete", userId: id }}>
							Delete
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
