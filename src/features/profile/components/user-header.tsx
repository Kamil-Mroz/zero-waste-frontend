import { ReportButton } from "@/features/report/components/report-button";
import { Card, CardContent } from "@/features/shared/components/ui/card";

type UserHeaderProps = {
	nickname: string;
	subtitle?: string;
	userId?: string;
	banned?: boolean;
};

export function UserHeader({
	nickname,
	subtitle,
	banned,
	userId,
}: UserHeaderProps) {
	return (
		<Card>
			<CardContent className="flex items-center flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-6">
				<div className="flex items-center flex-col sm:flex-row gap-4">
					<div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-full text-2xl font-semibold">
						{nickname.charAt(0).toUpperCase()}
					</div>

					<div>
						<h1 className="text-2xl font-bold text-center sm:text-left">
							{nickname}
						</h1>

						{subtitle && (
							<p className="text-muted-foreground text-center sm:text-left">
								{subtitle}
							</p>
						)}
						{banned && (
							<p className="text-destructive">Account has been suspended</p>
						)}
					</div>
				</div>
				{userId && !banned && (
					<ReportButton subjectId={userId} subjectType="USER" />
				)}
			</CardContent>
		</Card>
	);
}
