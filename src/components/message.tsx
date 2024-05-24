import { CgDanger } from '@/assets/icons'
import { tv } from 'tailwind-variants'

const message = tv({
  slots: {
    container:
      'flex items-center gap-3 border border-gray-400 p-3 rounded-md border-l-8 border-l-red',
    icon: 'text-red',
    section: 'flex flex-col gap-1',
  },
})

interface MessageProps {
  title: string
  message: string
}

const { container, icon, section } = message()

export const Message = ({ title, message }: MessageProps) => {
  return (
    <div className={container()}>
      <CgDanger size={40} className={icon()} />
      <section className={section()}>
        <strong>{title}</strong>
        <p>{message}</p>
      </section>
    </div>
  )
}
