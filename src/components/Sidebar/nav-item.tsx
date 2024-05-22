'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { usePathname } from 'next/navigation'

const navItem = tv({
  base: 'flex items-center gap-2 rounded-md py-2 px-3',
  variants: {
    active: {
      true: 'bg-primaryWithOpacity text-primary',
    },
  },
})

interface NavItemProps extends ComponentProps<'a'> {
  icon: JSX.Element
}

export const NavItem = ({
  children,
  href,
  icon: Icon,
  ...rest
}: NavItemProps) => {
  const pathname = usePathname()
  const isActive = pathname.includes(href!)

  return (
    <li>
      <Link href={href!} className={navItem({ active: isActive })} {...rest}>
        {Icon}
        {children}
      </Link>
    </li>
  )
}
