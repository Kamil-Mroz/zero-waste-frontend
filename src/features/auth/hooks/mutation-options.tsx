import { mutationOptions, useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { connectAccount, loginWithOAuth, unlinkAccount } from "../api";
import type { Providers } from "../types";
import { useAuth } from "./useAuth";

export function connectAccountMutationOptions(
	setPendingProvider: (provider: Providers | null) => void,
) {
	return mutationOptions({
		mutationFn: connectAccount,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Connection failed", description: message });
			}
			setPendingProvider(null);
		},
	});
}

export function unlinkAccountMutationOptions(
	setPendingProvider: (provider: Providers | null) => void,
) {
	return mutationOptions({
		mutationFn: unlinkAccount,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Unlink failed", description: message });
			}

			setPendingProvider(null);
		},
	});
}

export function loginWithOAuth2MutationOptions(
	provider: Providers,
	setPendingProvider: (provider: Providers | null) => void,
) {
	return mutationOptions({
		mutationFn: () => loginWithOAuth(provider),
		onSuccess: async (data) => {
			window.location.href = data.redirectUrl;
		},
		onMutate: () => {
			setPendingProvider(provider);
		},
		onSettled: () => {
			setPendingProvider(null);
		},
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Login failed", description: message });
			}
		},
	});
}

export function useLoginDemoMutation() {
	const { loginDemo } = useAuth();

	const route = useRouter();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginDemo,
		onSuccess: async () => {
			await route.invalidate();
			await navigate({ to: "/profile", replace: true });
		},
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Login failed", description: message });
			}
		},
	});
}
