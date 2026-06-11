import { Mail } from "lucide-react";
import { ProfileReviewCard } from "@/features/profile/components/profile-review-card";
import { CustomPagination } from "@/features/shared/components/custom-pagination";
import { EmptyComponent } from "@/features/shared/components/empty-component";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { Pageable } from "@/features/shared/types";
import type { ReviewResponse } from "../types";

type ReviewListProps = {
	reviews: ReviewResponse;
	pageable: Pageable;
};
export function ReviewList({ reviews, pageable }: ReviewListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Reviews</CardTitle>
			</CardHeader>
			<CardContent className="">
				{reviews.content.length === 0 ? (
					<EmptyComponent
						title="Reviews"
						description="No review yet."
						icon={Mail}
					/>
				) : (
					<div className="space-y-2">
						<div className="">
							{reviews.content.map((review) => (
								<ProfileReviewCard review={review} key={review.id} />
							))}
						</div>
						<CustomPagination
							pageable={pageable}
							totalPages={reviews.totalPages}
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
