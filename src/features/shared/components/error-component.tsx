import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
	type ErrorComponentProps,
	Link,
	useRouter,
} from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

export function ErrorComponent({ error }: ErrorComponentProps) {
	const router = useRouter();
	const queryClientErrorBoundary = useQueryErrorResetBoundary();

	const isDev = process.env.NODE_ENV !== "production";
	useEffect(() => {
		queryClientErrorBoundary.reset();
	}, [queryClientErrorBoundary]);

	return (
		<div className="grid h-full place-items-center">
			<div className="w-full max-w-md grid gap-4">
				<Alert variant="destructive">
					<AlertTriangle className="size-4" />
					<AlertTitle>Oops! Something went wrong</AlertTitle>
					<AlertDescription>
						We&apos;re sorry, but we encountered an unexpected and error.
					</AlertDescription>
				</Alert>
				<div className="space-y-4">
					<Button
						onClick={() => {
							router.invalidate();
						}}
						variant="outline"
						className="w-full"
					>
						Retry
					</Button>
					<Button asChild className="w-full">
						<Link to="/">Return to home</Link>
					</Button>
					{isDev ? (
						<div>
							<h3 className="mb-2 font-semibold">Error Message:</h3>
							<p className="text-sm mb-4">{error.message}</p>
							<h3 className="mb-2 font-semibold">Stack Trace:</h3>
							<pre className="overflow-x-auto whitespace-pre-wrap text-xs">
								{error.stack}
							</pre>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);

	// if (typeof error === "object" && error !== null && "status" in error) {
	// 	const err = error as {
	// 		status: number;
	// 		message: string;
	// 		errors?: Record<string, { message: string }>;
	// 	};

	// 	return (
	// 		<div>
	// 			<div className="text-center">
	// 				<h2 className="text-6xl">{err.status}</h2>
	// 				<p className="text-xl">{err.message}</p>
	// 			</div>

	// 			{err.errors &&
	// 				Object.entries(err.errors).map(([key, val]) => (
	// 					<p key={key}>
	// 						{key}: {val.message}
	// 					</p>
	// 				))}
	// 		</div>
	// 	);
	// }

	// return (
	// 	<div className="text-center">
	// 		<h2 className="text-6xl">Unexpected error</h2>
	// 		<p className="text-xl">{(error as Error)?.message}</p>
	// 	</div>
	// );
}
