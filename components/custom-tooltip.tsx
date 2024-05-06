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
}

const CustomTooltip = ({
  children,
  title,
  className,
  side,
}: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn("bg-muted text-primary rounded-none", className)}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
