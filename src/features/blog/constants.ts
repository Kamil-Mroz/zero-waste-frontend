export const BLOG_QUERY_KEYS = {
	all: ["blogs"],
	byIdRoot: () => [...BLOG_QUERY_KEYS.all, "details"],
	byId: (id: string) => [...BLOG_QUERY_KEYS.byIdRoot(), id],
	own: () => [...BLOG_QUERY_KEYS.all, "own"],
} as const;
