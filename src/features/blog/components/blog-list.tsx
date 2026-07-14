import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { BlogType } from "../types";

type BlogListProps = {
	blogs: BlogType[];
	showCreate?: boolean;
};
export function BlogList({ blogs, showCreate = false }: BlogListProps) {
	return (
		<section className="">
			<div className="mb-8 flex items-center justify-between flex-wrap">
				<div className="">
					<h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
					<p className="mt-2 text-muted-foreground">
						Explore articles about sustainability, zero waste living, and
						practical ways to protect our planet.
					</p>
				</div>

				{showCreate ? (
					<Button asChild>
						<Link to="/eco-hub/blogs/create">Create Blog</Link>
					</Button>
				) : null}
			</div>

			{blogs.length === 0 ? (
				<div className="rounded-xl border border-dashed p-12 text-center">
					<h2 className="text-lg font-semibold">No blogs yet</h2>
				</div>
			) : (
				<div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
					{blogs.map((blog) => (
						<Link
							key={blog.id}
							to="/eco-hub/blogs/$blogId"
							params={{ blogId: blog.id }}
							className="group shadow-sm transition hover:-translate-y-1 hover:shadow-md"
						>
							<Card>
								<CardHeader>
									<CardTitle>
										<h2 className="line-clamp-2 text-xl font-semibold transition group-hover:text-primary">
											{blog.title}
										</h2>
									</CardTitle>

									<CardDescription className="mt-3 line-clamp-3 text-sm text-muted-foreground">
										{blog.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="text-sm text-muted-foreground">
									By {blog.author.firstName} {blog.author.lastName}
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
