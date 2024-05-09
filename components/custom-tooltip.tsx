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
}

const CustomTooltip = ({
  children,
  title,
  className,
  side,
  align,
}: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "bg-primary text-xs text-background rounded-none p-1.5 border-none leading-none",
            className
          )}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
