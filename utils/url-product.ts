import { formatTitleProduct } from "./format-title-product"

interface URIProductProps {
  title: string
  id: string
}

export const URIProduct = ({ title, id }: URIProductProps) => {
  const titleProduct = formatTitleProduct(title)

  return `/p/${titleProduct}/${id}?indexImage=0`
}
