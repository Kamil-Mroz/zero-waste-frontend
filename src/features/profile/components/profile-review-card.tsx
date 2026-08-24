/** biome-ignore-all lint/suspicious/noArrayIndexKey: used to  renders stars */

import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ReportButton } from "@/features/report/components/report-button";
import { useReviewDeleteMutation } from "@/features/review/hooks/mutation-options";
import type { Review } from "@/features/review/types";
import { Avatar, AvatarFallback } from "@/features/shared/components/ui/avatar";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { cn } from "@/lib/utils";

type ProfileItemCardProps = {
	review: Review;
	isOwn: boolean;
};

export function ProfileReviewCard({ review, isOwn }: ProfileItemCardProps) {
	const isHidden = review.moderationStatus === "HIDDEN";
	const isVisible = review.moderationStatus === "VISIBLE";

	const deleteMutation = useReviewDeleteMutation();

	const handleDelete = () => {
		deleteMutation.mutate(review.id);
	};

	return (
		<div
			className={cn(
				"border-b pb-4 last:border-none",
				isHidden &&
					isOwn &&
					"rounded-lg border-destructive/30 bg-destructive/5 p-4",
			)}
		>
			{isHidden && isOwn && (
				<div className="mb-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
					<Badge variant={"destructive"}>Hidden</Badge>

					<div className="space-y-1">
						<p className="text-sm font-medium">This review has been hidden</p>

						<p className="text-xs text-muted-foreground">
							This review is no longer visible to other users because it was
							hidden by an administrator. You can delete it.
						</p>
					</div>
				</div>
			)}

			<div className="mb-2 flex items-center gap-3">
				<Avatar>
					<AvatarFallback>
						{review.reviewerName
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>

				<div className="flex-1">
					<div className="flex items-start justify-between gap-2 sm:items-center sm:flex-row">
						<div>
							<Button variant="link" asChild className="p-0 text-foreground">
								<Link
									to="/profile/$userId"
									params={{
										userId: review.reviewerId,
									}}
									className="font-sm"
								>
									{review.reviewerName}
								</Link>
							</Button>

							<div className="flex items-center gap-1">
								{[...Array(review.rating)].map((_, idx) => (
									<Star
										key={`review-${review.id}-${idx}`}
										className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
						</div>

						<div className="flex flex-col items-end gap-1">
							{isOwn && (
								<Button
									variant="destructive"
									size="sm"
									onClick={handleDelete}
									disabled={deleteMutation.isPending}
								>
									{deleteMutation.isPending ? "Deleting..." : "Delete"}
								</Button>
							)}

							{!isOwn && isVisible && (
								<ReportButton subjectId={review.id} subjectType="REVIEW" />
							)}

							<time className="block text-xs text-muted-foreground">
								{new Date(review.createdAt).toLocaleDateString()}
							</time>
						</div>
					</div>
				</div>
			</div>

			<p className="text-muted-foreground">{review.comment}</p>
		</div>
	);
} // };
