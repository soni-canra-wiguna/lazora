import AuthImageLayout from "./_components/auth-image"

export interface FormAuthLayoutPorps {
  children: React.ReactNode
  title: string
  desc?: string
  href_title: string
  desc_href: string
}

const FormAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 w-screen h-screen overflow-hidden p-8 md:p-6 lg:p-0 bg-background">
      {children}
      <AuthImageLayout />
    </div>
  )
}

export default FormAuthLayout
