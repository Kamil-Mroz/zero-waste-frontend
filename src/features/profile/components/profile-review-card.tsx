import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Review } from "@/features/review/types";
import { Avatar, AvatarFallback } from "@/features/shared/components/ui/avatar";
import { Button } from "@/features/shared/components/ui/button";

type ProfileItemCardProps = {
	review: Review;
};

export function ProfileReviewCard({ review }: ProfileItemCardProps) {
	return (
		<div className="border-b pb-4 last:border-none">
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
					<div className=" flex items-start sm:items-center justify-between sm:gap-2 flex-col sm:flex-row">
						<Button variant="link" asChild className="p-0 text-foreground">
							<Link
								to="/profile/$userId"
								params={{ userId: review.reviewerId }}
								className="font-sm"
							>
								{review.reviewerName}
							</Link>
						</Button>
						<time className="text-xs text-muted-foreground">
							{new Date(review.createdAt).toLocaleDateString()}
						</time>
					</div>
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
			</div>

			<p className="text-muted-foreground">{review.comment}</p>
		</div>
	);
}
