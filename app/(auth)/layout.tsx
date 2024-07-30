import AuthImageLayout from "@/components/auth/auth-image"
import { LayoutType } from "@/types"

const FormAuthLayout = ({ children }: LayoutType) => {
  return (
    <div className="grid h-screen w-screen grid-cols-12 overflow-hidden bg-background p-8 md:p-6 lg:p-0">
      {children}
      <AuthImageLayout />
    </div>
  )
}

export default FormAuthLayout
