/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState, useTransition } from 'react'

interface FormState<T> {
  success: boolean
  message: string | null
  errors: T | null
}

interface UseFormState<T> {
  action: (data: any) => Promise<FormState<T>>
  onSuccess?: (message: string | null) => Promise<void> | void
  initialState?: FormState<T>
  onError?: (message: string | null) => Promise<void> | void
  payload?: unknown
}

export function useFormState<T>({
  action,
  initialState,
  onError,
  onSuccess,
  payload,
}: UseFormState<T>) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      console.log(payload)
      const state = await action(payload ?? data)

      if (state.success && onSuccess) {
        await onSuccess(state.message)
        form.reset()
      }

      if (!state.success && onError) {
        await onError(state.message)
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
