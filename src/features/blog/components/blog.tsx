import { Link } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ReportButton } from "@/features/report/components/report-button";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { useBlogDeleteMutation } from "../hooks/mutation-options";
import type { BlogType } from "../types";

type BlogProps = {
	blog: BlogType;
};
export function Blog({ blog }: BlogProps) {
	const { user } = useAuth();

	const deleteMutation = useBlogDeleteMutation();

	const isOwner = user?.id === blog.author.id;
	const isHidden = blog.moderationStatus === "HIDDEN";
	const isVisible = blog.moderationStatus === "VISIBLE";

	const canEdit = isOwner && isVisible;
	const canDelete = isOwner;
	const canReport = !isOwner && isVisible;

	return (
		<article
			className={cn(
				"group relative",
				isHidden && isOwner && "rounded-xl border border-destructive/30 p-4",
			)}
		>
			{isHidden && isOwner && (
				<div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
					<div className="flex items-start gap-3">
						<div>
							<Badge variant={"destructive"}>HIDDEN</Badge>
						</div>

						<div className="space-y-1">
							<p className="font-medium">This blog has been hidden</p>

							<p className="text-sm text-muted-foreground">
								This blog is no longer visible to other users because it was
								hidden by an administrator. You can delete it, but you cannot
								edit or publish it while hidden.
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="flex items-center justify-between gap-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<h2 className="text-xl font-semibold tracking-tight">
							{blog.title}
						</h2>
					</div>

					<p className="text-sm text-muted-foreground">
						By {blog.author.nickname}
					</p>
				</div>

				{isOwner && (
					<div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
						{canEdit && (
							<Button asChild size="sm">
								<Link
									to="/eco-hub/blogs/$blogId/edit"
									params={{ blogId: blog.id }}
								>
									Edit
								</Link>
							</Button>
						)}

						{canDelete && (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => deleteMutation.mutate(blog.id)}
								disabled={deleteMutation.isPending}
							>
								{deleteMutation.isPending ? "Deleting..." : "Delete"}
							</Button>
						)}
					</div>
				)}

				{canReport && <ReportButton subjectId={blog.id} subjectType="BLOG" />}
			</div>

			<div className="mt-4">
				<p className="line-clamp-3 text-sm leading-relaxed max-w-prose mx-auto">
					{blog.content}
				</p>
			</div>
		</article>
	);
}
