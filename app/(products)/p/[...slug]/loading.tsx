import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <MaxWidthWrapper className="min-h-screen pt-32">
      <div className="flex items-start gap-12">
        <div className="sticky top-32 flex h-[620px] w-full flex-1 items-start gap-4">
          <div className="grid w-[60px] grid-cols-1 gap-4">
            <Skeleton className="aspect-square w-full bg-secondary-foreground/10" />
            <Skeleton className="aspect-square w-full bg-secondary-foreground/10" />
            <Skeleton className="aspect-square w-full bg-secondary-foreground/10" />
          </div>
          <Skeleton className="size-full flex-1 bg-secondary-foreground/10" />
        </div>
        <div className="flex w-[500px] flex-col">
          <div className="mb-3 flex items-center gap-3">
            <Skeleton className="h-[18px] w-[55px] rounded-full bg-secondary-foreground/10" />
            <Skeleton className="h-[18px] w-[55px] rounded-full bg-secondary-foreground/10" />
            <Skeleton className="h-[18px] w-[55px] rounded-full bg-secondary-foreground/10" />
          </div>
          <Skeleton className="mb-4 h-6 w-72 rounded-full bg-secondary-foreground/10" />
          <Skeleton className="mb-3 h-[18px] w-40 rounded-full bg-secondary-foreground/10" />
          <Skeleton className="mb-5 h-3 w-20 rounded-full bg-secondary-foreground/10" />

          <div className="mb-8 flex items-center gap-4">
            <Skeleton className="h-11 w-28 bg-secondary-foreground/10" />
            <Skeleton className="h-11 w-28 bg-secondary-foreground/10" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-6 w-full rounded-full bg-secondary-foreground/10" />
            <Skeleton className="h-6 w-full rounded-full bg-secondary-foreground/10" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
