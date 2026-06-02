import type { z } from "zod/v4";
import type { Pageable } from "../shared/types";
import type {
	CreateUserType,
	roleSchema,
	unbanUserSchema,
} from "./schemas/user.schema";

export type Roles = z.infer<typeof roleSchema>;
export type UserRoles = Roles[];

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	hasActiveBan: boolean;
	bannedUntil: string | null;
	joinedAt: string;
	roles: UserRoles;
};
export type UserFormProps = {
	defaultValues?: CreateUserType;
};

export type UsersQueryOptionsProps = Partial<
	Pageable & { text: string; roles: Roles[] }
>;

export type UnbanUserSchema = z.infer<typeof unbanUserSchema>;
