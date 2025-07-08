export interface ICategory{
    _id: string;
    name: string;
    subCategories?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}