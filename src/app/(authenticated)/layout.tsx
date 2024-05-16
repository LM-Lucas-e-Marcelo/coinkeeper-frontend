import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
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
        <section className="overflow-auto">{children}</section>
      </div>
    </div>
  )
}
