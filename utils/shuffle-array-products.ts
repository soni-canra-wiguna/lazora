import { ProductPostProps } from "@/types"

// fisher-yates algorithm
export const shuffleArrayProducts = (array: ProductPostProps[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const a = Math.floor(Math.random() * (1 + 1))
    ;[array[i], array[a]] = [array[a], array[i]]
  }

  return array
}
