import type { Providers } from "@/features/auth/types";
import { Button } from "@/features/shared/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/features/shared/components/ui/item";

type ProviderRowProps = {
	provider: Providers;
	connected: boolean;
	pending: boolean;
	disabled: boolean;
	onConnect: (provider: Providers) => void;
	onUnlink: (provider: Providers) => void;
};
export function ProviderRow({
	provider,
	connected,
	pending,
	onConnect,
	onUnlink,
	disabled,
}: ProviderRowProps) {
	return (
		<Item variant="outline">
			<ItemContent>
				<ItemTitle>
					{provider}{" "}
					{connected ? (
						<span className="text-green-500 text-xs">Connected</span>
					) : null}
				</ItemTitle>
				<ItemDescription>
					{connected
						? `Your ${provider} account is connected.`
						: `Connect your ${provider} account.`}
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				{connected ? (
					<Button
						variant={"destructive"}
						onClick={() => onUnlink(provider)}
						disabled={disabled}
					>
						{pending ? "..." : "Unlink"}
					</Button>
				) : (
					<Button
						variant="outline"
						onClick={() => onConnect(provider)}
						disabled={disabled}
					>
						{pending ? "..." : "Connect"}
					</Button>
				)}
			</ItemActions>
		</Item>
	);
}
