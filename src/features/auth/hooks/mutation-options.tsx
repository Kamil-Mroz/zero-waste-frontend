import type { AnyFormApi } from "@tanstack/react-form";
import {
	mutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useSidebar } from "@/features/shared/components/ui/sidebar";
import { connectAccount, loginWithOAuth, unlinkAccount } from "../api";
import type { LoginRequest, Providers, RegisterRequest } from "../types";
import { useAuth } from "./useAuth";

export function connectAccountMutationOptions(
	setPendingProvider: (provider: Providers | null) => void,
) {
	return mutationOptions({
		mutationFn: connectAccount,
		onError: () => {
			setPendingProvider(null);
		},
	});
}

export function unlinkAccountMutationOptions(
	setPendingProvider: (provider: Providers | null) => void,
) {
	return mutationOptions({
		mutationFn: unlinkAccount,
		onError: () => {
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
		onError: () => {
			setPendingProvider(null);
		},
	});
}

export function useLoginMutation() {
	const { login } = useAuth();
	return useMutation({
		mutationFn: ({ value }: { value: LoginRequest; form: AnyFormApi }) =>
			login(value),
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
	});
}

export function useLogoutMutation() {
	const { isMobile, toggleSidebar } = useSidebar();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: async () => {
			queryClient.clear();
			await navigate({ to: "/login" });
			if (isMobile) toggleSidebar();
		},
	});
}

export function useRegisterMutation() {
	const { register } = useAuth();

	return useMutation({
		mutationFn: ({ value }: { value: RegisterRequest; form: AnyFormApi }) =>
			register(value),
	});
}
