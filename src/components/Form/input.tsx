import { ComponentProps } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    inputStyles: 'flex-1 bg-secondary p-3 rounded-md border border-primary',
    labelStyles: 'w-full text-sm flex flex-col text-gray-500',
    errorStyles: 'text-xs text-red mt-1 ml-1',
  },
})

const { inputStyles, labelStyles, errorStyles } = input()

interface InputProps<TFormValues extends FieldValues>
  extends ComponentProps<'input'> {
  label: string
  register?: UseFormRegister<TFormValues>
  name: Path<TFormValues>
  error?: string
}

export function Input<TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
  ...rest
}: InputProps<TFormValues>) {
  return (
    <label htmlFor={name} className={labelStyles()}>
      {label}
      <input
        className={inputStyles()}
        id={name}
        {...(register && register(name))}
        {...rest}
      />
      {!!error && <span className={errorStyles()}>{error}</span>}
    </label>
  )
}
