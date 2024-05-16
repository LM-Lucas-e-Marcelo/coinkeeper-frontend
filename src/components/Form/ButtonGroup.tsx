import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const buttonGroup = tv({
  base: 'flex items-center gap-3',
})

export const ButtonGroup = ({ children }: ComponentProps<'div'>) => {
  return <div className={buttonGroup()}>{children}</div>
}
