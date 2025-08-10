import { FixerStatus, UserRoles } from "@/types";

export interface IUser {
  _id: string;
  email: string;
  role: UserRoles;
  avatar?: string;
  username: string;
  phone: number;
  cnic?: number;
  cnicFrontImage?: string;
  cnicBackImage?: string;
  verify?: boolean;
  cnicImage: string;
  categories: string[];
  subCategories: string[];
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  status: FixerStatus;
  createdBy?: string;
}

export interface IGetAllUser {
  data: Array<IUser>;
  totalDocuments: Array<{
    total: number;
  }>;
}
