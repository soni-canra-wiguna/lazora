"use client"

import { getDataProduct } from "@/services/get-products"
import { Skeleton } from "../ui/skeleton"

export default function TotalProducts() {
  const { data: dataProduct, isPending: pendingTotalProduct } = getDataProduct()
  return (
    <>
      {pendingTotalProduct ? (
        <Skeleton className="inline-block h-5 w-6" />
      ) : (
        dataProduct?.totalProducts
      )}
    </>
  )
}
