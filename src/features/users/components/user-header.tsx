import { Card, CardContent } from "@/features/shared/components/ui/card";
import type { User } from "../types";

type UserHeader = {
	user: User;
};

function UserHeader({ user }: UserHeader) {
	return (
		<Card>
			<CardContent className="flex items-center gap-4 p-6">
				<div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-full text-xl font-semibold">
					{user.firstName[0]}
					{user.lastName[0]}
				</div>

				<div>
					<h2 className="text-2xl font-semibold">
						{user.firstName} {user.lastName}
					</h2>

					{user.email && <p className="text-muted-foreground">{user.email}</p>}
				</div>
			</CardContent>
		</Card>
	);
}
export default UserHeader;
