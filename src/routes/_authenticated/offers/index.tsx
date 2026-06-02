import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/offers/")({
	beforeLoad: () => {
		throw redirect({
			to: "/offers/own",
		});
	},
});
