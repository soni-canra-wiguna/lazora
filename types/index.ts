import { Category } from "@prisma/client"

export type LayoutType = Readonly<{
  children: React.ReactNode
}>

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
  data: ProductPostProps[]
  currentPage: number
  totalPages: number
  totalProductsPerPage: number
  totalProducts: number
  status: number
}

export interface ProductCardProps {
  id: string
  image: ImageProps
  title: string
  categories: Category[]
  price: number
}
