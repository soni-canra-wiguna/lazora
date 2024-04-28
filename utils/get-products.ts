"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductPostProps } from "@/types"

export default function getproducts() {
  const { data, isPending, isError } = useQuery<ProductPostProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products")
      return data.products
    },
  })

  return { data, isPending, isError }
}

export const getSingleProduct = (id: string) => {
  const { data, isPending, isError } = useQuery<ProductPostProps>({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      return data.product
    },
  })

  return { data, isPending, isError }
}
