import { Link } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/shared/components/ui/button";
import { useBlogDeleteMutation } from "../hooks/mutation-options";
import type { BlogType } from "../types";

type BlogProps = {
	blog: BlogType;
};
export function Blog({ blog }: BlogProps) {
	const { user } = useAuth();
	const mutation = useBlogDeleteMutation();
	return (
		<article className="group rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-2">
					<h2 className="text-xl font-semibold tracking-tight">{blog.title}</h2>

					<p className="text-sm text-muted-foreground">
						By {blog.author.firstName} {blog.author.lastName}
					</p>
				</div>

				{user?.id === blog.author.id && (
					<div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
						<Button asChild size="sm">
							<Link
								to="/eco-hub/blogs/$blogId/edit"
								params={{ blogId: blog.id }}
							>
								Edit
							</Link>
						</Button>

						<Button
							variant="destructive"
							size="sm"
							onClick={() => mutation.mutate(blog.id)}
						>
							Delete
						</Button>
					</div>
				)}
			</div>

			<div className="mt-4">
				{/* <p className="text-muted-foreground">{blog.description}</p> */}

				<p className="line-clamp-3 text-sm leading-relaxed">{blog.content}</p>
			</div>
		</article>
	);
}
