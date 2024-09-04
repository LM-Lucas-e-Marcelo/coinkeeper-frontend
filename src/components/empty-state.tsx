import Lottie from 'react-lottie'
import * as animationData from '../animations/empty-state.json'

interface EmptyStateProps {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className="flex flex-col gap-3 w-full h-[50%] items-center justify-end">
      <h1 className="text-zinc-600 text-2xl text-center">{message}</h1>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  )
}
