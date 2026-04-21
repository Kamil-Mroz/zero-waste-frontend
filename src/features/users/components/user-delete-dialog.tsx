import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";

import { USER_QUERY_KEYS } from "../constants";
import { userDeleteMutationOptions } from "../hooks/mutation-options";
import { useUserSelectionStore } from "../store";

export function UserDeleteDialog({
	onDone,
	ids,
}: {
	ids: string[];
	onDone: () => void;
}) {
	const clear = useUserSelectionStore((s) => s.clear);
	const client = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		...userDeleteMutationOptions(),
		onSuccess: async () => {
			await Promise.all([
				client.invalidateQueries({ queryKey: USER_QUERY_KEYS.all }),
				...ids.map((id) =>
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.byId(id) }),
				),
			]);
			await router.invalidate();

			clear();
			onDone();
		},
	});

	return (
		<div className="space-y-4">
			<p>
				{ids.length === 1 ? "1 user selected" : `${ids.length} users selected.`}
			</p>
			<div className="grid grid-cols-2 gap-2">
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
				<Button
					variant="destructive"
					onClick={() => mutation.mutate(ids)}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "Delete User"}
				</Button>
			</div>
		</div>
	);
}
