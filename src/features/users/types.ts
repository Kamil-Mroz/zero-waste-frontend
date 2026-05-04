import type { Pageable } from "../shared/types";
import type { CreateUserType } from "./schemas/user.schema";

export type Roles = "USER" | "ADMIN" | "WRITER";
export type UserRoles = Roles[];

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	hasActiveBan: boolean;
	roles: UserRoles;
};
export type UserFormProps = {
	defaultValues?: CreateUserType;
};

export type UsersQueryOptionsProps = Pageable
