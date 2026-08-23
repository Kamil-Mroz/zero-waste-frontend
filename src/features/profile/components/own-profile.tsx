import { Suspense } from "react";
import type { User } from "@/features/users/types";
import { AccountStatusCard } from "./account-status-card";
import { OwnProfileStats } from "./own-profile-stats";
import { OwnProfileStatsSkeleton } from "./own-profile-stats-skeleton";
import { PersonalInfoCard } from "./personal-info-card";
import { RolesCard } from "./roles-card";
import { UserHeader } from "./user-header";

type Props = {
	user: User;
};

export function OwnProfile({ user }: Props) {
	return (
		<div className="mx-auto w-full space-y-4">
			<UserHeader nickname={user.nickname} />
			<div className="grid sm:grid-cols-2 gap-4">
				<AccountStatusCard
					hasActiveBan={user.hasActiveBan}
					bannedUntil={user.bannedUntil}
				/>

				<RolesCard roles={user.roles} />
			</div>

			<PersonalInfoCard user={user} />
			<Suspense fallback={<OwnProfileStatsSkeleton />}>
				<OwnProfileStats />
			</Suspense>
		</div>
	);
}
