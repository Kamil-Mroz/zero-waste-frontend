export const AUTH_QUERY_KEYS = {
	all: ["auth"],
	connections: () => [...AUTH_QUERY_KEYS.all, "connections"],
} as const;

export const OAUTH_LINK_PREFIX = "/v1/oauth/link" as const;
export const OAUTH_LOGIN_PREFIX = "/v1/oauth/login" as const;
