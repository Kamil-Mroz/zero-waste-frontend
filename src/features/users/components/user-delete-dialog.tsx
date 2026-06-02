import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";

import { USER_QUERY_KEYS } from "../constants";
import { userDeleteMutationOptions } from "../hooks/mutation-options";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";

export function UserDeleteDialog({
	onDone,
	ids,
}: {
	ids: string[];
	onDone: () => void;
}) {
	const client = useQueryClient();
	const router = useRouter();

  const isMobile = useIsMobile()
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

			onDone();
		},
	});

	return (
		<div className="space-y-4">
			<p>
				{ids.length === 1 ? "1 user selected" : `${ids.length} users selected.`}
			</p>
			<div className="grid sm:grid-cols-2 gap-2">
        {isMobile ? null :
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
        }
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
