import { Card, CardContent } from "@/features/shared/components/ui/card";

type UserHeaderProps = {
	firstName: string;
	lastName: string;
	subtitle?: string;
};

export function UserHeader({ firstName, lastName, subtitle }: UserHeaderProps) {
	return (
		<Card>
			<CardContent className="flex items-center flex-col sm:flex-row gap-4 p-6">
				<div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-full text-xl font-semibold">
					{firstName[0]}
					{lastName[0]}
				</div>

				<div>
					<h1 className="text-2xl font-bold text-center sm:text-left">
						{firstName} {lastName}
					</h1>

					{subtitle && (
						<p className="text-muted-foreground text-center sm:text-left">
							{subtitle}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
