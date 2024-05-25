import Balancer from "react-wrap-balancer"
import { Card } from "./ui/card"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { BannerProps } from "@/types"

const BannerItem = ({
  title,
  description,
  background_color,
  title_button,
  href_button,
  image,
  alt_image,
}: BannerProps) => {
  return (
    <Card
      style={{
        backgroundColor: background_color,
      }}
      className="w-full h-[450px] border-none rounded-xl grid grid-cols-12 overflow-hidden"
    >
      <div className="col-span-7 flex items-center pl-20">
        <div className="flex flex-col">
          <h1 className="text-6xl font-canelaRegular mb-4 capitalize">
            <Balancer>{title}</Balancer>
          </h1>
          <p className="mb-6">{description}</p>
          <Link href={href_button} className="size-max">
            <Button
              size="lg"
              className="capitalize w-max rounded-full font-canelaThin shimmer"
            >
              {title_button}
              <ArrowRight className="text-inherit size-4 ml-2 stroke-[1.5]" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="col-span-5 flex items-center justify-center">
        <div className="size-[90%] overflow-hidden flex items-center justify-center rounded-2xl selection:bg-transparent">
          <Image
            src={image || ""}
            width={600}
            height={600}
            alt={alt_image}
            className="size-full object-scale-down object-center"
          />
        </div>
      </div>
    </Card>
  )
}

export default BannerItem
