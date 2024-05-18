import Link from "next/link"

const NavList = () => {
  return (
    <div className="flex items-center gap-7 mt-1">
      <Link
        className="capitalize font-medium leading-none text-secondary-foreground/70 text-sm hover:text-primary"
        href="/products"
      >
        all products
      </Link>
      <Link
        className="capitalize font-medium leading-none text-secondary-foreground/70 text-sm hover:text-primary"
        href="/products"
      >
        category
      </Link>
      <Link
        className="capitalize font-medium leading-none text-secondary-foreground/70 text-sm hover:text-primary"
        href="/products"
      >
        popular
      </Link>
    </div>
  )
}

export default NavList
