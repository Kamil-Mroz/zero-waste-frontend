import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { ProfileReviewSummary } from "@/features/profile/types";
import { Rating } from "@/features/review/components/rating";
import { Avatar, AvatarFallback } from "@/features/shared/components/ui/avatar";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { ProfileReviewCard } from "./profile-review-card";

type ProfileReviewCardProps = {
	reviews: ProfileReviewSummary;
	userId?: string;
	isOwnProfile?: boolean;
};

export function ProfileReviewsCard({
	reviews,
	userId,
	isOwnProfile = false,
}: ProfileReviewCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Reviews</CardTitle>
				<Button asChild>
					<Link
						to={isOwnProfile ? "/reviews/received" : "/profile/$userId/reviews"}
						params={isOwnProfile ? {} : { userId }}
					>
						{isOwnProfile ? "My reviews" : "View All"}
					</Link>
				</Button>
			</CardHeader>

			<CardContent className="space-y-2">
				<div className="flex items-center gap-3">
					<Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
					<div>
						<div className="text-xl font-bold">
							{reviews.averageRating.toFixed(1)}
						</div>
						<p className="text-muted-foreground ">
							{reviews.reviewCount} reviews
						</p>
					</div>
				</div>

				<Rating
					ratingBreakdown={reviews.ratingBreakdown}
					reviewCount={reviews.reviewCount}
				/>

				<div className="space-y-2">
					<h4 className="font-medium">Latest reviews</h4>

					{reviews.latestReviews.length === 0 && (
						<p className="text-sm text-muted-foreground">No reviews yet.</p>
					)}

					{reviews.latestReviews.map((review) => (
						<ProfileReviewCard key={review.id} review={review} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
