import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const select = tv({
  slots: {
    selectStyles: 'flex-1 bg-secondary p-3 rounded-md border border-primary',
    labelStyles: 'w-full text-sm flex flex-col text-gray-500',
    errorStyles: 'text-xs text-red mt-1 ml-1',
  },
})

const { selectStyles, labelStyles, errorStyles } = select()

interface OptionProps {
  label: string | number
  value: string | number
}

interface SelectProps extends ComponentProps<'select'> {
  label?: string
  error?: string[]
  options: OptionProps[]
}

export function Select({ label, error, options, ...rest }: SelectProps) {
  return (
    <label htmlFor={label} className={labelStyles()}>
      {label}
      <select className={selectStyles()} id={label} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!!error && <span className={errorStyles()}>{error[0]}</span>}
    </label>
  )
}
