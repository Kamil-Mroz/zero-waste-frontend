import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { ITEM_QUERY_KEYS } from "../constants";
import { deleteItemMutationOptions } from "../hooks/mutation-options";
import type { ItemDeleteDialogProps } from "../types";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { appToast } from "@/features/shared/components/toast";

export function ItemDeleteDialog({ id, onDone }: ItemDeleteDialogProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
  const isMobile = useIsMobile()

	const mutation = useMutation({
		...deleteItemMutationOptions(),
		onSuccess: async (_, id) => {
				appToast.success({ title: "Item delete", description: "Item delete successfully"});

			await navigate({ to: "/marketplace/my-items", replace: true });

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ITEM_QUERY_KEYS.all,
				}),
				queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEYS.own() }),
			]);

			queryClient.removeQueries({ queryKey: ITEM_QUERY_KEYS.byId(id) });
		},
	});
	return (
		<div className="space-y-4">
			<div className="grid md:grid-cols-2 gap-2">
        {isMobile ? null :
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
        }
				<Button
					variant="destructive"
					onClick={() => mutation.mutate(id)}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "Delete Item"}
				</Button>
			</div>
		</div>
	);
}
