export interface IUserInfo {
  key: number;
  username?: string;
  email?: string;
  role?: string;
  phone?: string;
  verified?: boolean;
}

export interface ICategory {
  key: string;
  name: string;
  subCategories?: string[];
  createdAt?: Date;
}

export interface IFixer {
  key: string;
  name: string;
  email: string;
  phone: number;
  cnic: number;
  category: string[];
  subCategory: string[];
  rating: number;
  completedJobs: number;
  fixerRequestStatus: boolean;
  location: string;
  bio: "Very professional and punctual.";
}
