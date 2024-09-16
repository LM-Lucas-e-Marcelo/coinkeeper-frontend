import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const labelStyles = tv({
  base: 'flex items-center gap-3 text-zinc-600',
  variants: {
    alignCenter: {
      true: 'justify-center',
    },
  },
})
interface CheckboxProps
  extends ComponentProps<'input'>,
    VariantProps<typeof labelStyles> {
  label?: string
}

export function Checkbox({ label, name, alignCenter, ...rest }: CheckboxProps) {
  return (
    <label className={labelStyles({ alignCenter })}>
      <input
        type="checkbox"
        className="accent-primary w-5 h-5"
        name={name}
        {...rest}
      />
      {label && label}
    </label>
  )
}
