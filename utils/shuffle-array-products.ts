import { ProductPostProps } from "@/types"

// code ini menggunakan konsep fisher-yates untuk mengacak item di dalam array
export const shuffleArrayProducts = (array: ProductPostProps[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const a = Math.floor(Math.random() * (1 + 1))
    ;[array[i], array[a]] = [array[a], array[i]]
  }

  return array
}
