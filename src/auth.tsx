import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { toast } from "sonner";
import { api } from "./lib/axios";

interface AuthResponse {
	user: User;
	accessToken: string;
}

export interface User {
	id: string;
	email: string;
	roles: ("USER" | "ADMIN" | "WRITER")[];
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null | undefined;
	token: string | null;
	hasRole: (role: "USER" | "ADMIN" | "WRITER") => boolean;
	hasAnyRole: (roles: ("USER" | "ADMIN" | "WRITER")[]) => boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<User | null | undefined>(undefined);
	const [token, setToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			try {
				const refreshResponse = await api.post<AuthResponse>(
					"/api/v1/auth/refresh",
				);
				const newToken = refreshResponse.data.accessToken;
				setToken(newToken);

				// const userResponse = await api.get("/api/v1/auth/me", {
				// 	headers: {
				// 		Authorization: `Bearer ${newToken}`,
				// 	},
				// });

				// setUser(userResponse.data);
				setUser(refreshResponse.data.user);
				setIsAuthenticated(true);
			} catch {
				setToken(null);
				setUser(null);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};
		initAuth();
	}, []);
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
						setIsAuthenticated(true);
						originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
						originalRequest._retry = true;
						return api(originalRequest);
					} catch (refreshError) {
						setToken(null);
						setUser(null);
						setIsAuthenticated(false);
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
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}
	const login = async (email: string, password: string) => {
		const response = await api.post<AuthResponse>("/api/v1/auth/login", {
			email,
			password,
		});
		setToken(response.data.accessToken);
		setIsAuthenticated(true);
		setUser(response.data.user);
	};

	const logout = async () => {
		try {
			await api.post("/api/v1/auth/logout");
			setUser(null);
			setIsAuthenticated(false);
			setToken(null);
		} catch {
			toast.error("Something went wrong, please try again.");
		}
	};
	const hasRole = (role: "USER" | "ADMIN" | "WRITER") => {
		return user?.roles.includes(role) ?? false;
	};

	const hasAnyRole = (roles: ("USER" | "ADMIN" | "WRITER")[]) => {
		return roles.some((role) => user?.roles.includes(role)) ?? false;
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
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

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
