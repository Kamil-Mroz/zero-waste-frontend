import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";

type Props = {
	email: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
};

export function PersonalInfoCard({
	email,
	phoneNumber,
	firstName,
	lastName,
}: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
			</CardHeader>

			<CardContent className="grid gap-6 md:grid-cols-2">
				<div>
					<p className="text-muted-foreground text-sm">First Name</p>
					<p>{firstName}</p>
				</div>

				<div>
					<p className="text-muted-foreground text-sm">Last Name</p>
					<p>{lastName}</p>
				</div>

				<div>
					<p className="text-muted-foreground text-sm">Email</p>
					<p>{email}</p>
				</div>

				<div>
					<p className="text-muted-foreground text-sm">Phone Number</p>
					<p>{phoneNumber}</p>
				</div>
			</CardContent>
		</Card>
	);
}
