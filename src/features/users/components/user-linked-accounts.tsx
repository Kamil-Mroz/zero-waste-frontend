import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { AUTH_QUERY_KEYS } from "@/features/auth/constants";
import {
	connectAccountMutationOptions,
	unlinkAccountMutationOptions,
} from "@/features/auth/hooks/mutation-options";
import type { Providers } from "@/features/auth/types";
import { ProviderRow } from "./provider-row";

type UserLinkedAccountsProps = {
	providers: Providers[];
};
export function UserLinkedAccounts({ providers }: UserLinkedAccountsProps) {
	const [pendingProvider, setPendingProvider] = useState<Providers | null>(
		null,
	);
	const queryClient = useQueryClient();
	const router = useRouter();
	const onConnect = useMutation({
		...connectAccountMutationOptions(setPendingProvider),
		onSuccess: async (data) => {
			window.location.href = data.redirectUrl;
		},
		onMutate: (provider) => {
			setPendingProvider(provider);
		},
	});
	const onUnlink = useMutation({
		...unlinkAccountMutationOptions(setPendingProvider),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: AUTH_QUERY_KEYS.connections(),
			});
			await router.invalidate();
		},
		onMutate: (provider) => {
			setPendingProvider(provider);
		},
		onSettled: () => {
			setPendingProvider(null);
		},
	});
	const AvailableProviders = ["GOOGLE", "GITHUB"] satisfies Providers[];

	return (
		<section>
			<h2 className="text-xl font-semibold">Connected accounts</h2>

			<p className="text-muted-foreground ">
				Manage the accounts you can use to sign in.
			</p>

			<div className="mt-4 space-y-3">
				{AvailableProviders.map((provider) => (
					<ProviderRow
						key={provider}
						provider={provider}
						connected={providers.includes(provider) ?? false}
						pending={pendingProvider === provider}
						onConnect={onConnect.mutateAsync}
						onUnlink={onUnlink.mutateAsync}
						disabled={pendingProvider !== null}
					/>
				))}
			</div>
		</section>
	);
}
