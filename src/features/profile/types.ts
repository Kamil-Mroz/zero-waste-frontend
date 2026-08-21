import type { ItemType } from "../item/types";
import type { Review } from "../review/types";

export type PublicUserProfile = {
	id: string;
	nickname: string;
	joinedAt: string;
	banned: boolean;
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
