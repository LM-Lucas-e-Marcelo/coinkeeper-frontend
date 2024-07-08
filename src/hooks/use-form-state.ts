import { FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface UseFormState {
  action: (data: FormData) => Promise<FormState>
  onSuccess?: (message: string | null) => Promise<void> | void
  initialState?: FormState
  onError?: (message: string | null) => Promise<void> | void
}

export function useFormState({
  action,
  initialState,
  onError,
  onSuccess,
}: UseFormState) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess(state.message)
      }

      if (!state.success && onError) {
        await onError(state.message)
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
