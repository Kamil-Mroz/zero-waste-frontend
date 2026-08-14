import { useSuspenseQuery } from "@tanstack/react-query";
import { connectionsQueryOptions } from "@/features/auth/hooks/query-options";
import { UserLinkedAccounts } from "./user-linked-accounts";
import { UserPasswordManager } from "./user-password-manager";

export function UserSecurity() {
	const { data } = useSuspenseQuery(connectionsQueryOptions());
	return (
		<>
			<UserPasswordManager hasPassword={data.hasPassword} />
			<UserLinkedAccounts providers={data.providers} />
		</>
	);
}
