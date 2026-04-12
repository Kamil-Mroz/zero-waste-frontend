import "@Tanstack/react-router";

declare module "@tanstack/react-router" {
	export interface StaticDataRouteOption {
		getTitle?: () => string;
	}
}
