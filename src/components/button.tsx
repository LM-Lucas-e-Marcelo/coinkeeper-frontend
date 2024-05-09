import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'px-4 rounded-full hover:opacity-80',
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-red',
    },
  },

  defaultVariants: {
    color: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  return <button className={button(props)}>{props.children}</button>
}
