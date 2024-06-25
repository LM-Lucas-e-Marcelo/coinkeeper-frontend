import { Logo } from '@/components/logo'
import { SignInForm } from '@/sign-in-form'
import { tv } from 'tailwind-variants'

const home = tv({
  slots: {
    container: 'w-full flex',
    signInSection:
      'w-[400px] p-6 flex items-center justify-center flex-col h-screen border-r border-r-gray gap-6',
    imageSection: 'flex-1 bg-primaryWithOpacity',
  },
})

const { container, signInSection, imageSection } = home()

export default function Home() {
  return (
    <div className={container()}>
      <section className={signInSection()}>
        <Logo />
        <SignInForm />
      </section>
      <section className={imageSection()} />
    </div>
  )
}
