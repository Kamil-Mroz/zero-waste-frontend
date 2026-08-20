import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ReportButton } from "@/features/report/components/report-button";
import type { Review } from "@/features/review/types";
import { Avatar, AvatarFallback } from "@/features/shared/components/ui/avatar";
import { Button } from "@/features/shared/components/ui/button";

type ProfileItemCardProps = {
	review: Review;
	isOwn: boolean;
};

export function ProfileReviewCard({ review, isOwn }: ProfileItemCardProps) {
	return (
		<div className="border-b pb-4 last:border-none ">
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
					<div className=" flex items-start sm:items-center justify-between gap-2  sm:flex-row">
						<div>
							<Button variant="link" asChild className="p-0 text-foreground">
								<Link
									to="/profile/$userId"
									params={{ userId: review.reviewerId }}
									className="font-sm"
								>
									{review.reviewerName}
								</Link>
							</Button>

							<div className="flex items-center gap-1">
								{[...Array(review.rating)].map((_, idx) => (
									<Star
										key={`latest-reviews-${review.id}-${
											// biome-ignore lint/suspicious/noArrayIndexKey: looping through the rating stars
											idx
										}`}
										className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
						</div>
						<div className="flex items-end flex-col gap-1">
							<ReportButton subjectId={review.id} subjectType={"REVIEW"} />
							<time className=" block text-xs text-muted-foreground">
								{new Date(review.createdAt).toLocaleDateString()}
							</time>
						</div>
					</div>
				</div>
			</div>

			<p className="text-muted-foreground">{review.comment}</p>
		</div>
	);
}
