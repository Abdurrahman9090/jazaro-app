export interface IFixer {
  _id: string;
  bio: string;
  cnic: number;
  email: string;
  phone: number;
  username: string;
  avatar: string;
  fixerDetails: {
    cnicImage: string;
    categories: string[];
    subCategories: string[];
    rating: number;
    reviewsCount: number;
    jobsCompleted: number;
    fixerRequestStatus: boolean;
  };
}
