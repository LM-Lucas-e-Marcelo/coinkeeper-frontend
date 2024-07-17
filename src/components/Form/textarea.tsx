import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const textarea = tv({
  slots: {
    textareaStyles: 'flex-1 bg-secondary p-3 rounded-md border border-primary',
    labelStyles: 'w-full text-sm flex flex-col text-gray-500',
    errorStyles: 'text-xs text-red mt-1 ml-1',
  },
})

const { textareaStyles, labelStyles, errorStyles } = textarea()

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string
  error?: string[]
}

export function Textarea({ label, error, ...rest }: TextareaProps) {
  return (
    <label htmlFor={label} className={labelStyles()}>
      {label}
      <textarea rows={4} className={textareaStyles()} id={label} {...rest} />
      {!!error && <span className={errorStyles()}>{error[0]}</span>}
    </label>
  )
}
