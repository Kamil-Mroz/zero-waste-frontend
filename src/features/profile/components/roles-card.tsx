import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";

type Props = {
	roles: string[];
};

export function RolesCard({ roles }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Roles</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="flex flex-wrap gap-2">
					{roles.map((role) => (
						<Badge
							key={role}
							variant="secondary"
						>
							{role}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
