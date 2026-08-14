import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
	type ErrorComponentProps,
	Link,
	useRouter,
} from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { getErrorDetails } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

export function ErrorComponent({ error }: ErrorComponentProps) {
	const router = useRouter();
	const queryClientErrorBoundary = useQueryErrorResetBoundary();

	useEffect(() => {
		queryClientErrorBoundary.reset();
	}, [queryClientErrorBoundary]);

	const errorInfo = getErrorDetails(error);
	const isDev = import.meta.env.DEV;

	return (
		<div className="grid h-full place-items-center">
			<div className="w-full max-w-md grid gap-4">
				<Alert variant="destructive">
					<AlertTriangle className="size-4" />
					<AlertTitle>
						{errorInfo.status
							? `${errorInfo.status} ${errorInfo.title}`
							: errorInfo.title}
					</AlertTitle>
					<AlertDescription>{errorInfo.message}</AlertDescription>
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
}
