import type { ItemType } from "../item/types";
import type { Review, ReviewResponse } from "../review/types";

export type PublicUserProfile = {
	id: string;
	firstName: string;
	lastName: string;
	joinedAt: string;
	items: ProfileItemSummary;
	reviews: ProfileReviewSummary;
};

export type OwnProfile = Pick<PublicUserProfile, "items" | "reviews">;

export type ProfileReviewSummary = {
	averageRating: number;
	reviewCount: number;
	latestReviews: Review[];
	ratingBreakdown: Record<RatingKey, number>;
};

export type RatingKey =
	| "oneStar"
	| "twoStar"
	| "threeStar"
	| "fourStar"
	| "fiveStar";

export type ProfileItemSummary = {
	itemCountBreakDown: ItemCountBreakDown;
	latestItems: ItemType[];
};

type ItemCountBreakDown = {
	totalItems: number;
	given: number;
	pending: number;
	available: number;
};
