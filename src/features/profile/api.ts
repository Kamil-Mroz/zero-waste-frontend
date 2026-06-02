import { api } from "@/lib/axios";
import type { PublicUser } from "./types";

export const fetchPublicUserProfile = async (userId: string) => {
	const res = await api.get<PublicUser>(`/api/v1/profiles/${userId}`);
	return res.data;
};
