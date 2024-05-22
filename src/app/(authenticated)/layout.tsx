import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CoinKeeper',
}

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[200px_calc(100%-200px)] text-darkgray">
      <Sidebar />
      <div className="grid grid-rows-[5rem_calc(100vh-5rem)]">
        <Header />
        <section className="overflow-auto py-3 px-6">{children}</section>
      </div>
    </div>
  )
}
