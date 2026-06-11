import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileReviewsCard } from "@/features/profile/components/profile-reviews-card";
import { OwnProfileQueryOptions } from "../hooks/query-options";
import { ProfileItemsCard } from "./profile-items-card";

export function OwnProfileStats() {
	const { data: profile } = useSuspenseQuery(OwnProfileQueryOptions());

	return (
		<>
			<ProfileReviewsCard isOwnProfile reviews={profile.reviews} />
			<ProfileItemsCard isOwnProfile items={profile.items} />
		</>
	);
}
