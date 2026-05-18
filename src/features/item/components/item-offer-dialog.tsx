import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { showInterestInItemMutationOptions } from "../hooks/mutation-options";
import type { ItemOfferDialogProps } from "../types";

function ItemOfferDialog({ id, onDone }: ItemOfferDialogProps) {
	const mutation = useMutation({
		...showInterestInItemMutationOptions(id),

		onSuccess: async () => {
			toast.success("Offer submitted");
			onDone();
		},
	});
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-2">
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
				<Button
					variant="success"
					onClick={() => mutation.mutate()}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "I'm Interested"}
				</Button>
			</div>
		</div>
	);
}
export default ItemOfferDialog;
