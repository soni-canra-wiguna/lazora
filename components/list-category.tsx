import Link from "next/link"
import MaxWidthWrapper from "./max-width-wrapper"
import { CATEGORIES } from "@/data/categories"
import { Button } from "./ui/button"

const ListCategory = () => {
  return (
    <MaxWidthWrapper className="scrollX my-10 flex items-center gap-5 overflow-x-auto pb-2">
      {CATEGORIES.map((c) => {
        const replaceCategory = c.value.toLowerCase().replace(/ /g, "-") // from "hello world" to "hello-world"
        const url = `/c/${replaceCategory}`
        return (
          <Link href={url} className="size-max">
            <Button
              className="m-max rounded-full capitalize"
              variant="secondary"
            >
              {c.title}
            </Button>
          </Link>
        )
      })}
    </MaxWidthWrapper>
  )
}

export default ListCategory
