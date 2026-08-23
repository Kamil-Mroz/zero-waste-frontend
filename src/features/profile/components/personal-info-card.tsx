import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { User } from "@/features/users/types";

type PersonalInfoCardProps = {
	user: User;
};

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
			</CardHeader>

			<CardContent className="grid gap-6 md:grid-cols-2">
				<div>
					<p className="text-muted-foreground text-sm">Nickname</p>
					<p>{user.nickname}</p>
				</div>

				<div>
					<p className="text-muted-foreground text-sm">Email</p>
					<p>{user.email}</p>
				</div>
			</CardContent>
		</Card>
	);
}
