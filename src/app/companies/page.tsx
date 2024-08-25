import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

import { getCompanies } from '@/http/companies/get-companies'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CompanyCard } from './company-card'

export const metadata: Metadata = {
  title: 'CoinKeeper',
}

export default async function Companies() {
  if (!isAuthenticated()) {
    redirect('/')
  }

  const { companies } = await getCompanies()

  return (
    <div className="grid min-h-screen w-full grid-cols-[200px_calc(100%-200px)] text-darkgray">
      <Sidebar />
      <div className="grid grid-rows-[5rem_calc(100vh-5rem)]">
        <Header />
        <section className="overflow-auto py-3 px-6">
          <header className="text-2xl">
            <h1>Minhas empresas</h1>
          </header>
          <div className="flex gap-3 flex-wrap mt-5">
            {companies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
