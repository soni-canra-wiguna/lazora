"use client"

import type { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getUsersData = () => {
  const {
    data: users,
    isPending,
    isError,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["usersData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/register")
      return data.users
    },
  })

  return { users, isPending, isError, isLoading }
}

export default getUsersData

export const getUsersDataByQuery = (query: string | null) => {
  const queryParams = query?.replace(/\s+/g, "-").toLowerCase()

  const {
    data: usersByQuery,
    isPending,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["usersDataByQuery", queryParams],
    queryFn: async () => {
      const { data } = await axios.get(`/api/register?query=${queryParams}`)
      return data.user
    },
  })

  return { usersByQuery, isPending, isLoading, isError }
}
