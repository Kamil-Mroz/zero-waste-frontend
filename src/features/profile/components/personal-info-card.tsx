import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";

type Props = {
	nickname: string;
};

export function PersonalInfoCard({ nickname }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
			</CardHeader>

			<CardContent className="grid gap-6 md:grid-cols-2">
				<div>
					<p className="text-muted-foreground text-sm">Nickname</p>
					<p>{nickname}</p>
				</div>
			</CardContent>
		</Card>
	);
}
