import { ComponentProps } from 'react'

interface CheckboxProps extends ComponentProps<'input'> {
  label?: string
}

export function Checkbox({ label, name, ...rest }: CheckboxProps) {
  return (
    <label htmlFor={name} className="flex items-center gap-3 text-zinc-600">
      <input
        id={name}
        type="checkbox"
        className="accent-primary w-5 h-5"
        name={name}
        {...rest}
      />
      {label && label}
    </label>
  )
}
