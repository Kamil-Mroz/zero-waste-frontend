import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
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
					disabled={pendingProvider !== null}
				>
					{pendingProvider === "GOOGLE" ? "..." : "Login with Google"}
				</Button>
				<Button
					variant="outline"
					className="block w-full"
					onClick={() => loginWithGithub.mutate()}
					disabled={pendingProvider !== null}
				>
					{pendingProvider === "GITHUB" ? "..." : "Login with Github"}
				</Button>
			</CardContent>
			{/* <CardFooter>
				<Link to="/register">Do not have an account? go to register page.</Link>
			</CardFooter> */}
		</Card>
	);
}
