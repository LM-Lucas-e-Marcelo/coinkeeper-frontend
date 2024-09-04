import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'p-[7px] px-4 bg-primary text-white rounded-md py-[10px] min-w-[100px] hover:enabled:opacity-85 disabled:bg-gray-400 disabled:cursor-not-allowed border-primary border',
  variants: {
    isIcon: {
      true: 'p-2',
    },
    variant: {
      danger: 'bg-red border-red',
      secondary:
        'bg-transparent text-primary hover:enabled:bg-primary hover:enabled:text-white hover:enabled:opacity-1',
    },
  },
})

interface ButtonProps
  extends VariantProps<typeof button>,
    ComponentProps<'button'> {}

export const Button = ({ children, isIcon, variant, ...rest }: ButtonProps) => {
  return (
    <button className={button({ isIcon, variant })} {...rest}>
      {children}
    </button>
  )
}
