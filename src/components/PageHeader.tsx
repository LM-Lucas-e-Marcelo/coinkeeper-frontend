import React, { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const pageHeader = tv({
  base: 'my-2 flex items-center justify-between bg-white w-full py-3 px-6',
})

export const PageHeader = ({ children }: ComponentProps<'div'>) => {
  return <div className={pageHeader()}>{children}</div>
}
