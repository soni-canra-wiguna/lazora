"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductPostProps } from "@/types"
import { shuffleArrayProducts } from "@/utils/shuffle-array-products"

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

export const getShuffleProducts = () => {
  const { data, isPending, isError } = useQuery<ProductPostProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products`)
      const shuffleProducts = shuffleArrayProducts(data.products)
      return shuffleProducts
    },
  })

  return { data, isPending, isError }
}
