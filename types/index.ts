import { Category, ImageProduct, Product } from "@prisma/client"

// export interface ProductPostProps extends Product {
//   images: ImageProduct[]
//   comments?: Comment[]
//   categories: Category[]
// }

export interface ProductPostProps {
  id: string
  title: string
  price: number
  images: ImageProps[]
  description?: string
  stock?: number
  categories: CategoryProps[]
  comments: CommentProps[]

  createdAt: Date
  updatedAt: Date
}

export interface ImageProps {
  id: string
  image?: string
  productId: string
}

export interface CategoryProps {
  id: string
  title: string
  productId: string
}

export interface CommentProps {
  id: string
  message?: string
  username?: string
  email?: string
  image?: string
  role?: string
  productId: string

  createdAt: Date
  updatedAt: Date
}

export interface BannerProps {
  title: string
  description: string
  background_color: string
  title_button: string
  href_button: string
  image: string
  alt_image: string
}

export interface ProductDataType {
  message: string
  products: ProductPostProps[]
  currentPage: number
  totalPages: number
  totalItems: number
  totalProducts: number
  status: number
}
