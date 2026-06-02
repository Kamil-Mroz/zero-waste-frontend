import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import type { ItemActionsProps } from "../types";

export function ItemActions({
	isOwner,
	item,
	isAuthenticated,
}: ItemActionsProps) {
	return (
		<div className="flex gap-2 pt-4">
			{isOwner && item.state !== "GIVEN" && (
				<>
					<Button variant="warning" asChild>
						<Link to="/marketplace/$itemId/edit" params={{ itemId: item.id }}>
							Edit
						</Link>
					</Button>
					<Button variant="destructive" asChild>
						<Link
							to="/marketplace/$itemId"
							params={{ itemId: item.id }}
							search={{ modal: "delete" }}
							replace={true}
						>
							Delete
						</Link>
					</Button>
				</>
			)}

			{!isOwner && isAuthenticated && item.state !== "GIVEN" && (
				<>
					<Button variant="success" asChild>
						<Link
							to="/marketplace/$itemId"
							params={{ itemId: item.id }}
							search={{ modal: "offer" }}
							replace={true}
						>
							I'm interested
						</Link>
					</Button>
					<Button variant="secondary">Report</Button>
				</>
			)}

			{!isAuthenticated && (
				<p className="text-sm text-muted-foreground">Login to interact</p>
			)}
		</div>
	);
}
