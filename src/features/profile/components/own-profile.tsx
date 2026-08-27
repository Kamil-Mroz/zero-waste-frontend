import { Suspense } from "react";
import { Badge } from "@/features/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { User } from "@/features/users/types";
import { AccountStatusCard } from "./account-status-card";
import { OwnProfileStats } from "./own-profile-stats";
import { OwnProfileStatsSkeleton } from "./own-profile-stats-skeleton";
import { PersonalInfoCard } from "./personal-info-card";
import { UserHeader } from "./user-header";

type Props = {
	user: User;
};

export function OwnProfile({ user }: Props) {
	return (
		<div className="mx-auto w-full space-y-4">
			<UserHeader
				nickname={user.nickname}
				banned={user.hasActiveBan}
				subtitle={`Member since ${new Date(
					user.joinedAt,
				).toLocaleDateString()}`}
			/>
			<div className="grid sm:grid-cols-2 gap-4">
				<AccountStatusCard
					hasActiveBan={user.hasActiveBan}
					bannedUntil={user.bannedUntil}
				/>

				<Card>
					<CardHeader>
						<CardTitle>Role</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary">{user.role}</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			<PersonalInfoCard user={user} />
			<Suspense fallback={<OwnProfileStatsSkeleton />}>
				<OwnProfileStats />
			</Suspense>
		</div>
	);
}
