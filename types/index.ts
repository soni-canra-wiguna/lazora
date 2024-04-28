import { Category, ImageProduct, Product } from "@prisma/client"

export interface ProductPostProps extends Product {
  images: ImageProduct[]
  comments?: Comment[]
  categories: Category[]
}
