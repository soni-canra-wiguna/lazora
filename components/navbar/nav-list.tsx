import Link from "next/link"

const NavList = () => {
  return (
    <div className="mt-1 flex items-center gap-7">
      <Link
        className="text-sm font-medium capitalize leading-none text-secondary-foreground/70 hover:text-primary"
        href="/p"
      >
        all products
      </Link>
      <Link
        className="text-sm font-medium capitalize leading-none text-secondary-foreground/70 hover:text-primary"
        href="/c"
      >
        category
      </Link>
      <Link
        className="text-sm font-medium capitalize leading-none text-secondary-foreground/70 hover:text-primary"
        href="/"
      >
        popular
      </Link>
    </div>
  )
}

export default NavList
