import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod/v4";
import { LoginForm } from "@/features/auth/components/login-form";
import { loginWithOAuth2MutationOptions } from "@/features/auth/hooks/mutation-options";
import type { Providers } from "@/features/auth/types";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { Checkbox } from "@/features/shared/components/ui/checkbox";
import { Field, FieldGroup } from "@/features/shared/components/ui/field";
import { Label } from "@/features/shared/components/ui/label";
import { Separator } from "@/features/shared/components/ui/separator";

export const loginRouteSchema = z.object({
	error: z.string().optional(),
});

export const Route = createFileRoute("/_unauthenticated/login")({
	head: () => ({
		meta: [
			{
				title: "Login",
			},
		],
	}),
	validateSearch: loginRouteSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const { redirect, error } = Route.useSearch();
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const [pendingProvider, setPendingProvider] = useState<Providers | null>(
		null,
	);

	const loginWithGithub = useMutation(
		loginWithOAuth2MutationOptions("GITHUB", setPendingProvider),
	);

	const loginWithGoogle = useMutation(
		loginWithOAuth2MutationOptions("GOOGLE", setPendingProvider),
	);

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle className="text-center text-3xl">Login</CardTitle>
				{error && (
					<CardDescription className="text-destructive">
						{error}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="grid gap-2">
				<LoginForm redirect={redirect} />

				<div className=" flex items-center gap-2">
					<Separator className="flex-1" />
					<span>OR</span>
					<Separator className="flex-1" />
				</div>
				<Button
					variant="outline"
					className="block w-full"
					onClick={() => loginWithGoogle.mutate()}
					disabled={!acceptedTerms || pendingProvider !== null}
				>
					{pendingProvider === "GOOGLE" ? "..." : "Login with Google"}
				</Button>
				<Button
					variant="outline"
					className="block w-full"
					onClick={() => loginWithGithub.mutate()}
					disabled={!acceptedTerms || pendingProvider !== null}
				>
					{pendingProvider === "GITHUB" ? "..." : "Login with Github"}
				</Button>
			</CardContent>
			<CardFooter>
				<FieldGroup className="max-w-sm">
					<Field orientation="horizontal">
						<Checkbox
							id="terms-checkbox"
							name="terms-checkbox"
							checked={acceptedTerms}
							onCheckedChange={(value) =>
								setAcceptedTerms((prev) =>
									value !== "indeterminate" ? value : !prev,
								)
							}
						/>
						<Label htmlFor="terms-checkbox">
							<span>
								I have read and aggree to the{" "}
								<Link to="/terms" className="text-indigo-700 underline">
									Terms & Conditions
								</Link>
								. I acknowledge the{" "}
								<Link to="/privacy" className="text-indigo-700 underline">
									Privacy Policy
								</Link>
								.
							</span>
						</Label>
					</Field>
				</FieldGroup>
			</CardFooter>
		</Card>
	);
}
