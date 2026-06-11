import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import type { Offer } from "../types";

type DataTableRowActionsProps = {
	row: Row<Offer>;
};

export function OfferReceivedTableRowsActions({
	row,
}: DataTableRowActionsProps) {
	const id = row.original.id;

	return (
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
						<Link
							to="/offers/received"
							search={(prev) => ({ ...prev, modal: "accept", offerId: id })}

						replace={true}
						>
							Accept
						</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" asChild>
						<Link
							to="/offers/received"
							search={(prev) => ({ ...prev, modal: "reject", offerId: id })}

						replace={true}
						>
							Reject
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
	);
}
