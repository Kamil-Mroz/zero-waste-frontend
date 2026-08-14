import { api } from "@/lib/axios";
import { OAUTH_LINK_PREFIX, OAUTH_LOGIN_PREFIX } from "./constants";
import type { Connections, Providers } from "./types";

export const getConnections = async () => {
	const res = await api.get<Connections>(`/v1/oauth/connections`);
	return res.data;
};

export const unlinkAccount = async (provider: Providers) => {
	await api.delete(`${OAUTH_LINK_PREFIX}/${provider}`);
};

export const connectAccount = async (provider: Providers) => {
	const response = await api.post<{ redirectUrl: string }>(
		`${OAUTH_LINK_PREFIX}/${provider}`,
	);
	return response.data;
};

export const createPassword = async (data: {
	newPassword: string;
	confirmPassword: string;
}) => {
	const response = await api.post("/v1/auth/password", data);
	return response.data;
};

export const updatePassword = async (data: {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}) => {
	const response = await api.put("/v1/auth/password", data);
	return response.data;
};

export const loginWithOAuth = async (provider: Providers) => {
	const response = await api.post<{ redirectUrl: string }>(
		`${OAUTH_LOGIN_PREFIX}/${provider}`,
	);
	return response.data;
};
