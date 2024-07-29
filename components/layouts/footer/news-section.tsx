import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, Mail } from "lucide-react"
import { ImFacebook } from "react-icons/im"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { FooterItem } from "./footer-item"

export const NewsSection = ({ className }: { className?: string }) => {
  const socialIcon = [
    {
      title: "facebook",
      href: "https://facebook.com",
      icon: <ImFacebook className="text-2xl" />,
    },
    {
      title: "instagram",
      href: "https://instagram.com",
      icon: <IoLogoInstagram className="text-2xl" />,
    },
    {
      title: "twitter x",
      href: "https://twitter.com",
      icon: <RiTwitterXLine className="text-2xl" />,
    },
  ]
  return (
    <div className={cn("col-span-4 flex flex-col", className)}>
      <h1 className="mb-5 text-2xl font-medium uppercase">LAZORA NEWS</h1>
      <p className="mb-5 text-primary">
        Stay update with all the Lazora Tech News, including new products and
        amazing deals.
      </p>
      <div className="relative mb-8 h-max w-full">
        <Mail className="absolute left-2.5 top-1/2 size-6 -translate-y-1/2 stroke-[1.5] text-primary" />
        <Input
          className="h-12 border border-primary bg-transparent px-12 placeholder:capitalize"
          placeholder="enter your email"
          spellCheck="false"
        />
        <ArrowRight className="absolute right-2.5 top-1/2 size-6 -translate-y-1/2 stroke-[1.5] text-primary" />
      </div>
      <FooterItem title="Follow us" className="mb-10">
        <div className="flex items-center gap-4">
          {socialIcon.map((social) => (
            <a
              href={social.href}
              key={social.title}
              className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground/10 transition-all duration-300 hover:bg-secondary-foreground/20"
            >
              {social.icon}
              <p className="sr-only">{social.title}</p>
            </a>
          ))}
        </div>
      </FooterItem>
      <p className="capitalize text-primary">
        &copy; {new Date().getFullYear()} Lazora, all right reserved.
      </p>
    </div>
  )
}
