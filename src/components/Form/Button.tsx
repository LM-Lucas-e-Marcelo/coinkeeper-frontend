import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'p-[7px] px-4 bg-primary text-white rounded-md min-h-8',
  variants: {
    isIcon: {
      true: 'p-2',
    },
  },
})

interface ButtonProps
  extends VariantProps<typeof button>,
    ComponentProps<'button'> {}

export const Button = ({ children, isIcon, ...rest }: ButtonProps) => {
  return (
    <button className={button({ isIcon })} {...rest}>
      {children}
    </button>
  )
}
