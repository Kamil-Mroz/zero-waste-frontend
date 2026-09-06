import { Badge } from "@/features/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";

type Props = {
	activeBan: boolean;
	bannedUntil?: string | null;
};

export function AccountStatusCard({ activeBan, bannedUntil }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Status</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex items-center gap-2">
					<span>Status:</span>

					{activeBan ? (
						<Badge variant="destructive">Banned</Badge>
					) : (
						<Badge>Active</Badge>
					)}
				</div>

				{activeBan && bannedUntil && (
					<div>
						<p className="text-muted-foreground text-sm">Banned until</p>

						<p>{new Date(bannedUntil).toLocaleString()}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
