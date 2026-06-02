import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { appToast } from "@/features/shared/components/toast";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import type { ItemOfferDialogProps } from "../../item/types";
import { showInterestInItemMutationOptions } from "../hooks/mutation-options";

function OfferItemDialog({ id, onDone }: ItemOfferDialogProps) {
	const isMobile = useIsMobile();
	const mutation = useMutation({
		...showInterestInItemMutationOptions(id),

		onSuccess: async () => {
			appToast.success({
				title: "Item offer",
				description: "Offer submitted successfully",
			});
			onDone();
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
export default OfferItemDialog;
