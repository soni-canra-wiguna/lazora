import AuthImageLayout from "@/components/auth/auth-image"

export interface FormAuthLayoutPorps {
  children: React.ReactNode
  title: string
  desc?: string
  href_title: string
  desc_href: string
}

const FormAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen w-screen grid-cols-12 overflow-hidden bg-background p-8 md:p-6 lg:p-0">
      {children}
      <AuthImageLayout />
    </div>
  )
}

export default FormAuthLayout
