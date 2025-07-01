import { UserRoles } from "@/types";

export interface IUser {
  _id: string;
  email: string;
  role: UserRoles;
  avatar?: string;
  username: string;
  phone:number;
  verified?: boolean;
  createdBy?: string;
  organization?: string;
  employee_limit?: number;
}

export interface IGetAllUser {
  data: Array<IUser>;
  totalDocuments: Array<{
    total: number;
  }>;
}
