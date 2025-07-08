import { FixerStatus, UserRoles } from "@/types";

export interface IUser {
  _id: string;
  email: string;
  role: UserRoles;
  avatar?: string;
  username: string;
  phone: number;
  verified?: boolean;
  fixerDetails?: {
    cnicImage: string;
    categories: string[];
    subCategories: string[];
    rating: number;
    reviewsCount: number;
    jobsCompleted: number;
    fixerRequestStatus: FixerStatus;
  };
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
