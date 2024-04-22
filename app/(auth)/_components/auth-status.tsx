import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface AuthStatusProps {
  message: string
  status: "succes" | "failed"
}

const AuthStatus = ({ status = "succes", message }: AuthStatusProps) => {
  if (status === "failed") {
    return <FailedStatus message={message} />
  }

  return <SuccesStatus message={message} />
}

export default AuthStatus

const FailedStatus = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center rounded-md w-full py-2.5 px-3 gap-2 bg-red-500/30 text-red-500 shimmer overflow-hidden">
      <AlertTriangle className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

const SuccesStatus = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center rounded-md w-full py-2.5 px-3 gap-2 bg-emerald-500/30 text-emerald-500 shimmer overflow-hidden">
      <CheckCircle2 className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
