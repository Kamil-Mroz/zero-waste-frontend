import { useQuery } from "@tanstack/react-query";
import { type PropsWithChildren, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { AuthContext } from "../hooks/useAuth";
import type {
	AuthResponse,
	AuthState,
	LoginRequest,
	RegisterRequest,
	Roles,
	UserRoles,
} from "../types";

export function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<AuthState["user"]>(null);
	const [token, setToken] = useState<AuthState["token"]>(null);

	const { isLoading } = useQuery({
		queryKey: ["auth", "refresh"],
		queryFn: async () => {
			const res = await api.post<AuthResponse>("/api/v1/auth/refresh");
			setToken(res.data.accessToken);
			setUser({ ...res.data.user, roles: new Set(res.data.user.roles) });
			return res.data;
		},
		retry: false,
	});

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use((config) => {
			config.headers.Authorization =
				!config._retry && token
					? `Bearer ${token}`
					: config.headers.Authorization;
			return config;
		});

		return () => {
			api.interceptors.request.eject(authInterceptor);
		};
	}, [token]);

	useLayoutEffect(() => {
		const refreshInterceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				if (
					error.response.status === 401 &&
					error.response.data.detail === "Token invalid or expired"
				) {
					try {
						const response = await api.post<AuthResponse>(
							"/api/v1/auth/refresh",
						);
						setToken(response.data.accessToken);
						setUser(response.data.user);
						originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
						originalRequest._retry = true;
						return api(originalRequest);
					} catch (refreshError) {
						setToken(null);
						setUser(null);
						return Promise.reject(refreshError);
					}
				}

				return Promise.reject(error);
			},
		);

		return () => {
			api.interceptors.response.eject(refreshInterceptor);
		};
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen text-2xl">
				Zero Waste
			</div>
		);
	}
	const register = async (data: RegisterRequest) => {
		await api.post("/api/v1/auth/register", data);
	};

	const login = async (data: LoginRequest) => {
		const response = await api.post<AuthResponse>("/api/v1/auth/login", data);
		setToken(response.data.accessToken);
		setUser(response.data.user);
	};

	const logout = async () => {
		try {
			await api.post("/api/v1/auth/logout");
			setUser(null);
			setToken(null);
		} catch {
			toast.error("Something went wrong, please try again.");
		}
	};
	const hasRole = (role: Roles) => {
		if (!user) return false;
		return user.roles.has(role) ?? false;
	};

	const hasAnyRole = (roles: UserRoles) => {
		if (!user) return false;
		return Array.from(roles).some((role) => user.roles.has(role));
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
				login,
				logout,
				hasRole,
				hasAnyRole,
				token,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
