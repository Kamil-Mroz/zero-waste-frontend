import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { appToast } from "@/features/shared/components/toast";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { ITEM_QUERY_KEYS } from "../constants";
import {
	hideItemMutationOptions,
	publishItemMutationOptions,
} from "../hooks/mutation-options";
import type { ItemDeleteDialogProps } from "../types";

export function ItemPublishDialog({ id, onDone }: ItemDeleteDialogProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const mutation = useMutation({
		...publishItemMutationOptions(),
		onSuccess: async (_, id) => {
			appToast.success({
				title: "Item publish",
				description: "Item published successfully",
			});

			await navigate({
				to: "/marketplace/$itemId",
				replace: true,
				params: { itemId: id },
			});

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ITEM_QUERY_KEYS.all,
				}),
				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() }),

				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.byId(id) }),
			]);
		},
	});
	return (
		<div className="space-y-4">
			<div className="grid sm:grid-cols-2 gap-2">
				{isMobile ? null : (
					<Button variant="outline" onClick={onDone}>
						Cancel
					</Button>
				)}
				<Button
					variant={"success"}
					onClick={() => mutation.mutate(id)}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "Publish"}
				</Button>
			</div>
		</div>
	);
}
