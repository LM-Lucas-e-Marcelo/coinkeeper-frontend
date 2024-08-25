'use client'
import { useRouter } from 'next/navigation'
import { tv } from 'tailwind-variants'
import { useFormState } from './hooks/use-form-state'
import { signInWithEmailAndPassword } from './actions/auth/sign-in-action'
import { toast } from 'react-toastify'
import { Input } from './components/form/input'
import { Button } from './components/form/button'

const signInForm = tv({
  slots: {
    form: 'w-full flex flex-col gap-4',
  },
})

const { form } = signInForm()

export function SignInForm() {
  const router = useRouter()

  const [{ errors, message }, handleSubmit, isPending] = useFormState({
    action: signInWithEmailAndPassword,
    onError() {
      toast(message, { type: 'error' })
    },
    onSuccess() {
      router.push('/companies')
    },
  })
  return (
    <form className={form()} onSubmit={handleSubmit}>
      <Input label="Usuário" name="username" error={errors?.username} />
      <Input
        label="Senha"
        name="password"
        type="password"
        error={errors?.password}
      />
      <Button type="submit" disabled={isPending}>
        Entrar
      </Button>
    </form>
  )
}
