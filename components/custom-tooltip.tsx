"use client"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface CustomTooltipProps {
  children: React.ReactNode
  title: string
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  delayDuration?: number
  skipDelayDuration?: number
}

const CustomTooltip = ({
  children,
  title,
  className,
  side,
  align,
  delayDuration = 400,
  skipDelayDuration = 300,
}: CustomTooltipProps) => {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "rounded-none border-none bg-primary p-1.5 text-xs leading-none text-background",
            className,
          )}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
