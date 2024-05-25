import { Banner } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const getBanners = () => {
  const { data, isPending, isError } = useQuery<Banner[]>({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axios.get("/api/banners")
      return data.banners
    },
  })

  return {
    data,
    isPending,
    isError,
  }
}
