import React, { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const pageHeader = tv({
  base: 'mt-2 mb-8 flex items-center justify-between bg-white w-full',
})

export const PageHeader = ({ children }: ComponentProps<'div'>) => {
  return <div className={pageHeader()}>{children}</div>
}
