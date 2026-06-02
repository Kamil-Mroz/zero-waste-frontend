import { useAuth } from "./useAuth";

export function useRequiredAuth() {
	const auth = useAuth();

	if (!auth.user) {
		throw new Error("useRequiredAuth used outside authenticated route");
	}

	return {
		...auth,
		user: auth.user,
	};
}
