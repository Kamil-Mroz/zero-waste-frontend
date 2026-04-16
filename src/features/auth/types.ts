import type { z } from "zod/v4";
import type { loginSchema } from "./schemas/login.schema";
import type { registerSchema } from "./schemas/register.schema";
export type AuthResponse = {
	user: User;
	accessToken: string;
};

export type Roles = "USER" | "ADMIN" | "WRITER";
export type UserRoles = Set<Roles>;

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	roles: UserRoles;
};

export type AuthState = {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	hasRole: (role: "USER" | "ADMIN" | "WRITER") => boolean;
	hasAnyRole: (roles: UserRoles) => boolean;
	register: (data: RegisterRequest) => Promise<void>;
	login: (data: LoginRequest) => Promise<void>;
	logout: () => Promise<void>;
};

export type LoginRequest = z.infer<typeof loginSchema>;

export type RegisterRequest = z.infer<typeof registerSchema>;
