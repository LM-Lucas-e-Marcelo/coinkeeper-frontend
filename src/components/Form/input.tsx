import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    inputStyles:
      'flex-1 bg-secondary p-3 rounded-md border border-primary file:bg-primaryWithOpacity file:border-0 file:text-primary file:rounded-md file:mr-2',
    labelStyles: 'w-full text-sm flex flex-col text-gray-500',
    errorStyles: 'text-xs text-red mt-1 ml-1',
  },

  variants: {
    isFile: {
      true: {
        inputStyles: 'py-1 pl-1 file:py-2 file:px-4 cursor-pointer',
      },
    },
  },
})

const { inputStyles, labelStyles, errorStyles } = input()

interface InputProps extends ComponentProps<'input'> {
  label?: string
  error?: string[]
}

export function Input({ label, error, type, ...rest }: InputProps) {
  return (
    <label htmlFor={label} className={labelStyles()}>
      {label}
      <input
        className={inputStyles({ isFile: type === 'file' })}
        id={label}
        type={type}
        {...rest}
      />
      {!!error && <span className={errorStyles()}>{error[0]}</span>}
    </label>
  )
}
