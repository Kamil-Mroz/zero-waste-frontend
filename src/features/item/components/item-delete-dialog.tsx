import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { ITEM_QUERY_KEYS } from "../constants";
import { deleteItemMutationOptions } from "../hooks/mutation-options";
import type { ItemDeleteDialogProps } from "../types";

export function ItemDeleteDialog({ id, onDone }: ItemDeleteDialogProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const mutation = useMutation({
		...deleteItemMutationOptions(),
		onSuccess: async (_, id) => {
			toast.success("Item deleted successfully");

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
			<div className="grid grid-cols-2 gap-2">
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
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
