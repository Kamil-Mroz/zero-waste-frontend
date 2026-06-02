import type { User } from "@/features/users/types";
import { AccountStatusCard } from "./account-status-card";
import { MyItemsCard } from "./my-items-card";
import { PersonalInfoCard } from "./personal-info-card";
import { RolesCard } from "./roles-card";
import { UserHeader } from "./user-header";

type Props = {
	user: User;
};

export function OwnProfile({ user }: Props) {
	return (
		<div className="mx-auto w-full space-y-6 py-6">
			<UserHeader
				firstName={user.firstName}
				lastName={user.lastName}
				subtitle={user.email}
			/>

			<MyItemsCard />

			<PersonalInfoCard
				firstName={user.firstName}
				lastName={user.lastName}
				email={user.email}
				phoneNumber={user.phoneNumber}
			/>

			<AccountStatusCard
				hasActiveBan={user.hasActiveBan}
				bannedUntil={user.bannedUntil}
			/>

			<RolesCard roles={user.roles} />
		</div>
	);
}
