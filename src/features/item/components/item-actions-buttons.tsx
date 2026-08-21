import { Link } from "@tanstack/react-router";
import { ReportButton } from "@/features/report/components/report-button";
import { Button } from "@/features/shared/components/ui/button";
import type { ItemActionsProps } from "../types";

export function ItemActionsButtons({
	isOwner,
	item,
	isAuthenticated,
}: ItemActionsProps) {
	const isHidden = item.moderationStatus === "HIDDEN";
	const isGiven = item.state === "GIVEN";
	const isPending = item.state === "PENDING";
	const isVisible = item.moderationStatus === "VISIBLE";

	const canEdit = isOwner && !isGiven && !isHidden;
	const canPublish = canEdit && isPending;
	const canHide = canEdit && !isPending;

	const canDelete = isOwner && (isHidden || !isGiven);

	const canInteract = !isOwner && isAuthenticated && !isGiven && isVisible;

	return (
		<div className="flex gap-2 pt-4">
			{isOwner &&
				(isHidden ? (
					<>
						<p className="text-sm text-muted-foreground mr-auto">
							This item has been hidden by an administrator.
						</p>

						<Button variant="destructive" asChild>
							<Link
								to="/marketplace/$itemId"
								params={{ itemId: item.id }}
								search={{ modal: "delete" }}
								replace
							>
								Delete
							</Link>
						</Button>
					</>
				) : (
					<>
						{!isGiven && (
							<>
								{canPublish && (
									<Button asChild>
										<Link
											to="/marketplace/$itemId"
											params={{ itemId: item.id }}
											search={{ modal: "publish" }}
											replace
										>
											Publish
										</Link>
									</Button>
								)}

								{canHide && (
									<Button variant="secondary" asChild>
										<Link
											to="/marketplace/$itemId"
											params={{ itemId: item.id }}
											search={{ modal: "hide" }}
											replace
										>
											Hide
										</Link>
									</Button>
								)}

								<Button variant="warning" asChild>
									<Link
										to="/marketplace/$itemId/edit"
										params={{ itemId: item.id }}
									>
										Edit
									</Link>
								</Button>
							</>
						)}

						{canDelete && (
							<Button variant="destructive" asChild>
								<Link
									to="/marketplace/$itemId"
									params={{ itemId: item.id }}
									search={{ modal: "delete" }}
									replace
								>
									Delete
								</Link>
							</Button>
						)}
					</>
				))}

			{canInteract && (
				<>
					<Button variant="success" asChild>
						<Link
							to="/marketplace/$itemId"
							params={{ itemId: item.id }}
							search={{ modal: "offer" }}
							replace
						>
							I'm interested
						</Link>
					</Button>

					<ReportButton subjectId={item.id} subjectType="ITEM" />
				</>
			)}

			{!isAuthenticated && (
				<p className="text-sm text-muted-foreground">Login to interact</p>
			)}
		</div>
	);
}
