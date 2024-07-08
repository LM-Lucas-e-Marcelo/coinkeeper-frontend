import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    inputStyles: 'flex-1 bg-secondary p-3 rounded-md border border-primary',
    labelStyles: 'w-full text-sm flex flex-col text-gray-500',
    errorStyles: 'text-xs text-red mt-1 ml-1',
  },
})

const { inputStyles, labelStyles, errorStyles } = input()

interface InputProps extends ComponentProps<'input'> {
  label?: string
  error?: string[]
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <label htmlFor={label} className={labelStyles()}>
      {label}
      <input className={inputStyles()} id={label} {...rest} />
      {!!error && <span className={errorStyles()}>{error[0]}</span>}
    </label>
  )
}
