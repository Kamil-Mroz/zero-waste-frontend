import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { PublicUser } from "../types";
import { UserHeader } from "./user-header";

type Props = {
	user: PublicUser;
};

export function PublicUserProfile({ user }: Props) {
	return (
		<div className="mx-auto  w-full space-y-6 py-6">
			<UserHeader
				firstName={user.firstName}
				lastName={user.lastName}
				subtitle={`Member since ${new Date(
					user.joinedAt,
				).toLocaleDateString()}`}
			/>

			<Card>
				<CardHeader>
					<CardTitle>Items</CardTitle>
				</CardHeader>

				<CardContent className="flex items-center justify-between">
					<div>
						<p className="text-2xl font-bold">{user.itemCount}</p>

						<p className="text-muted-foreground text-sm">Active listings</p>
					</div>

					<Button asChild>
						<Link
							to="/users/$userId/items"
							params={{
								userId: user.id,
							}}
						>
							View Items
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
