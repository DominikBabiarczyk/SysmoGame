import { ProductCategory } from "@src/features/product/components/add-product/category-select/category.model";
import { File } from "./file";
import { Author } from "./user";

export type SortOptions =
  | "price_ASC"
  | "price_DESC"
  | "popularity_DESC"
  | "discount_ASC"
  | "discount_DESC";

export interface Product {
  id: string;
  createdAt?: string;
  title: string;
  description?: string;
  user: Author;
  category: ProductCategory;
  files: File[];
  keywords: string[];
}

export interface UserProducts {
  category: ProductCategory;
  createdAt: string;
  description: string;
  files: { id: string }[];
  id: string;
  keywords: string[];
  title: string;
  user: ProductUser;
  variants: ProductVariant[];
}

interface ProductUser {
  acceptedRegulations: boolean;
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  login: string;
  role: string;
}

interface ProductVariant {
  createdAt: string;
  files: { id: string }[];
  id: string;
  name: string;
  price: number;
}
export interface ProductPhoto {
  id: string;
  file: File;
}
