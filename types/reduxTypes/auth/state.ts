import { UserRoles } from "@/types";
import { IUser } from "@/types/reduxTypes/user";

export interface AuthState {
  loading?: boolean;
  user?: IUser | null;
  token?: string | null;
  role?: UserRoles | null;
  avatar?: string | null;
  recentLoggedOut?: boolean;
  invalidToken?: boolean | null;
  isRegistered?: boolean | null;
  isAuthenticated?: boolean | null;
}
