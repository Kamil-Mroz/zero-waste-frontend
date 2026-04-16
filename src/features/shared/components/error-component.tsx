import { AxiosError } from "axios";

export function RouteError({ error }: { error: Error }) {
	if (error instanceof AxiosError) {
		const message = error.response?.data?.detail || error.message;

		return (
			<div className="text-center">
				<h2>{error.response?.status}</h2>
				<p>{message}</p>
			</div>
		);
	}
	if (typeof error === "object" && error !== null && "status" in error) {
		const err = error as {
			status: number;
			message: string;
			errors?: Record<string, { message: string }>;
		};

		return (
			<div>
				<div className="text-center">
					<h2>{err.status}</h2>
					<p>{err.message}</p>
				</div>

				{err.errors &&
					Object.entries(err.errors).map(([key, val]) => (
						<p key={key}>
							{key}: {val.message}
						</p>
					))}
			</div>
		);
	}

	return (
		<div className="text-center">
			<h2>Unexpected error</h2>
			<p>{(error as Error)?.message}</p>
		</div>
	);
}
