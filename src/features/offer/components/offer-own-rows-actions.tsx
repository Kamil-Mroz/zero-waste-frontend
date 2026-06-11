import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import type { Offer } from "../types";

type DataTableRowActionsProps = {
	row: Row<Offer>;
};

export function OfferOwnTableRowsActions({ row }: DataTableRowActionsProps) {
	const offer = row.original;
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
					{offer.status === "PENDING" ? (
						<DropdownMenuItem asChild variant={"destructive"}>
							<Link
								to="/offers/own"
								search={(prev) => ({ ...prev, modal: "cancel", offerId: id })}
								replace={true}
							>
								Cancel
							</Link>
						</DropdownMenuItem>
					) : null}
					{offer.status === "ACCEPTED" ? (
						<DropdownMenuItem asChild>
							<Link
								to="/reviews"
								search={(prev) => ({ ...prev, modal: "review", offerId: id })}
								replace={true}
							>
								Leave review
							</Link>
						</DropdownMenuItem>
					) : null}
				</DropdownMenuContent>
			</DropdownMenu>
	);
}
