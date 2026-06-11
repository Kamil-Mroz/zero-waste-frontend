import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/features/shared/components/ui/button";
import { DataTableColumnHeader } from "@/features/shared/components/ui/data-table-column-header";
import { OfferOwnTableRowsActions } from "../components/offer-own-rows-actions";
import { OfferReceivedTableRowsActions } from "../components/offer-received-rows-actions";
import type { Offer } from "../types";

export const receivedColumns: ColumnDef<Offer>[] = [
	{
		id: "item",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Item" />
		),
		cell: ({ row }) => {
			const offer = row.original;
			return (
				<Button
					variant="link"
					asChild
					size="sm"
					className="pl-0 text-foreground"
				>
					<Link to="/marketplace/$itemId" params={{ itemId: offer.item.id }}>
						{offer.item.title}
					</Link>
				</Button>
			);
		},
	},
	{
		accessorKey: "Buyer",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Buyer" />
		),
		cell: ({ row }) => {
			const offer = row.original;
			return (
				<Button
					variant="link"
					asChild
					size="sm"
					className="pl-0 text-foreground"
				>
					<Link to="/profile/$userId" params={{ userId: offer.buyer.id }}>
						{offer.buyer.firstName} {offer.buyer.lastName}
					</Link>
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({
			row: {
				original: { status },
			},
		}) => (
			<span
				className={`${status === "ACCEPTED" ? "text-emerald-500" : status === "REJECTED" ? "text-destructive" : status === "CANCELLED" ? "text-orange-500" : ""}`}
			>
				{status}
			</span>
		),
	},
	{
		id: "actions",
		cell: ({ row }) =>
			row.original.status === "PENDING" ? (
				<OfferReceivedTableRowsActions row={row} />
			) : null,
	},
];

export const ownColumns: ColumnDef<Offer>[] = [
	{
		id: "item",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Item" />
		),
		cell: ({ row }) => {
			const offer = row.original;
			return (
				<Button
					variant="link"
					asChild
					size="sm"
					className="pl-0 text-foreground"
				>
					<Link to="/marketplace/$itemId" params={{ itemId: offer.item.id }}>
						{offer.item.title}
					</Link>
				</Button>
			);
		},
	},
	{
		id: "owner",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Owner" />
		),
		cell: ({ row }) => {
			const offer = row.original;
			return (
				<Button
					variant="link"
					asChild
					size="sm"
					className="pl-0 text-foreground"
				>
					<Link to="/profile/$userId" params={{ userId: offer.item.owner.id }}>
						{offer.item.owner?.firstName} {offer.item.owner?.lastName}
					</Link>
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({
			row: {
				original: { status },
			},
		}) => (
			<span
				className={`${status === "ACCEPTED" ? "text-emerald-500" : status === "REJECTED" ? "text-destructive" : status === "CANCELLED" ? "text-orange-500" : ""}`}
			>
				{status}
			</span>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <OfferOwnTableRowsActions row={row} />,
	},
];
