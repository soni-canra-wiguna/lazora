import { Skeleton } from "@/components/ui/skeleton"

const LoadingProduct = () => {
  return (
    <div className="flex gap-12 items-start">
      <div className="flex-1 sticky top-32 flex gap-4 items-start w-full h-[620px]">
        <div className="w-[60px] grid grid-cols-1 gap-4">
          <Skeleton className="w-full aspect-square bg-secondary-foreground/10" />
          <Skeleton className="w-full aspect-square bg-secondary-foreground/10" />
          <Skeleton className="w-full aspect-square bg-secondary-foreground/10" />
        </div>
        <Skeleton className="size-full flex-1 bg-secondary-foreground/10" />
      </div>
      <div className="w-[500px] flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="w-[55px] h-[18px] bg-secondary-foreground/10 rounded-full" />
          <Skeleton className="w-[55px] h-[18px] bg-secondary-foreground/10 rounded-full" />
          <Skeleton className="w-[55px] h-[18px] bg-secondary-foreground/10 rounded-full" />
        </div>
        <Skeleton className="w-72 h-6 bg-secondary-foreground/10 rounded-full mb-4" />
        <Skeleton className="w-40 h-[18px] bg-secondary-foreground/10 rounded-full mb-3" />
        <Skeleton className="w-20 h-3 bg-secondary-foreground/10 rounded-full mb-5" />

        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-28 h-11 bg-secondary-foreground/10" />
          <Skeleton className="w-28 h-11 bg-secondary-foreground/10" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="w-full h-6 rounded-full bg-secondary-foreground/10" />
          <Skeleton className="w-full h-6 rounded-full bg-secondary-foreground/10" />
        </div>
      </div>
    </div>
  )
}

export default LoadingProduct
