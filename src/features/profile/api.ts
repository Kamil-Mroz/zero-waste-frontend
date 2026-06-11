import { api } from "@/lib/axios";
import type { OwnProfile, PublicUserProfile } from "./types";

export const fetchPublicUserProfile = async (userId: string) => {
	const res = await api.get<PublicUserProfile>(`/api/v1/profiles/${userId}`);
	return res.data;
};

export const fetchOwnProfile = async () => {
	const res = await api.get<OwnProfile>(`/api/v1/profiles`);
	return res.data;
};
