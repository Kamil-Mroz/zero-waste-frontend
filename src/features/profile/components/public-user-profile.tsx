import type { PublicUserProfile as PublicUserProfileType } from "../types";
import { ProfileItemsCard } from "./profile-items-card";
import { ProfileReviewsCard } from "./profile-reviews-card";
import { UserHeader } from "./user-header";

type PublicUserProfileProps = {
	profile: PublicUserProfileType;
	userId: string;
};

export function PublicUserProfile({ profile, userId }: PublicUserProfileProps) {
	return (
		<div className="mx-auto  w-full space-y-4">
			<UserHeader
				firstName={profile.firstName}
				lastName={profile.lastName}
				subtitle={`Member since ${new Date(
					profile.joinedAt,
				).toLocaleDateString()}`}
			/>
			<ProfileReviewsCard reviews={profile.reviews} userId={userId} />
			<ProfileItemsCard items={profile.items} userId={userId} />
		</div>
	);
}
