import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const buttonGroup = tv({
  base: 'flex items-center gap-3',
  variants: {
    align: {
      end: 'ml-auto',
    },
  },
})

interface ButtonGroupProps
  extends VariantProps<typeof buttonGroup>,
    ComponentProps<'div'> {}

export const ButtonGroup = ({ children, align, ...rest }: ButtonGroupProps) => {
  return (
    <div className={buttonGroup({ align })} {...rest}>
      {children}
    </div>
  )
}
