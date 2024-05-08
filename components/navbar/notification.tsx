import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bell className="size-6 cursor-pointer" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="w-[350px] h-[500px] mt-3 rounded-lg"
      >
        ini notification
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification
