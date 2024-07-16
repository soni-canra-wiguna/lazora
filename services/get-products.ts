"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductDataType, ProductPostProps } from "@/types"
import { shuffleArrayProducts } from "@/utils/shuffle-array-products"

export const getDataProduct = () => {
  const { data, isPending, isError } = useQuery<ProductDataType>({
    queryKey: ["data-products"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products`)
      return data
    },
  })

  return {
    data,
    isPending,
    isError,
  }
}

export default function getProducts() {
  const { data, isPending, isError } = useQuery<ProductPostProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products")
      return data.data
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

export const getShuffleProducts = ({
  isShouldFetch = true,
}: {
  isShouldFetch: boolean
}) => {
  const { data, isPending, isError } = useQuery<ProductPostProps[]>({
    queryKey: ["shuffle-products", isShouldFetch],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products`)
      const shuffleProducts = shuffleArrayProducts(data.products)
      return shuffleProducts
    },
    enabled: isShouldFetch,
  })

  return { data, isPending, isError }
}
