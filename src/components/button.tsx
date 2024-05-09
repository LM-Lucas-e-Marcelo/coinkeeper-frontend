import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  slots: {
    base: 'px-4 rounded-full hover:opacity-80',
    box: 'h-48 w-48',
  },
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-red',
    },
    boxColor: {
      primary: {
        box: 'bg-red',
      },
      secondary: {
        box: 'bg-zinc-700',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    boxColor: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode
}

export const Button = ({ children, boxColor, color }: ButtonProps) => {
  const { base, box } = button({ boxColor, color })

  return (
    <div className={box()}>
      <button className={base()}>{children}</button>
    </div>
  )
}
