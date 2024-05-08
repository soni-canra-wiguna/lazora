"use client"

import getproducts from "@/utils/get-products"
import ProductCard from "./product-card"

const ListProducts = () => {
  const { data, isPending, isError } = getproducts()
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {isPending
        ? "loading data..."
        : isError
        ? "productnya kenapa nih"
        : data?.map(({ id, images, title, categories, price }) => (
            <ProductCard
              key={id + title}
              id={id}
              image={images[0]}
              title={title}
              categories={categories}
              price={price}
            />
          ))}
    </div>
  )
}

export default ListProducts
