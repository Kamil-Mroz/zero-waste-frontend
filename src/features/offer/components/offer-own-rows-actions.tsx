import type { Row } from "@tanstack/react-table";
import type { Offer } from "../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/shared/components/ui/dropdown-menu";
import { Button } from "@/features/shared/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";

type DataTableRowActionsProps = {
	row: Row<Offer>;
};

export function OfferOwnTableRowsActions({
	row,
}: DataTableRowActionsProps) {
	const id = row.original.id;

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
					<DropdownMenuItem asChild variant={"destructive"}>
						<Link
							to="/offers/own"
							search={(prev) => ({ ...prev, modal: "cancel", offerId: id })}

						replace={true}
						>
							Cancel
						</Link>
					</DropdownMenuItem>

				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

