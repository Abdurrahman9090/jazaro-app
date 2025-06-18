import { UserRoles } from "@/types";

export interface IUser {
  _id: string;
  email: string;
  role: UserRoles;
  avatar?: string;
  first_name: string;
  last_name?: string;
  verified?: boolean;
  createdBy?: string;
  organization?: string;
  employee_limit?: number;
}
