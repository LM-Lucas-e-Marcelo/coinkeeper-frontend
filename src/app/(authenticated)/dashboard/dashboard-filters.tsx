'use client'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import { useUrlParams } from '@/hooks/use-params'
import { ICompany } from '@/http/companies/get-companies'
import { IRegions } from '@/http/regions/get-regions'
import { FormEvent, useCallback, useMemo } from 'react'

interface DashboardFiltersProps {
  regions: IRegions
  companies: ICompany[]
}

export function DashboardFilters({
  regions,
  companies,
}: DashboardFiltersProps) {
  const { addParams } = useUrlParams()

  const companyOptions = useMemo(
    () => [
      { label: 'Todas', value: 'all' },
      ...companies.map((company) => ({
        label: company.name,
        value: company.id,
      })),
    ],
    [companies],
  )

  const regionsOptions = useMemo(
    () => [
      { label: 'Selecione uma região', value: '' },
      ...regions.items.map((region) => ({
        label: region.name,
        value: region.id,
      })),
    ],
    [regions.items],
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const data = new FormData(form)
      const filters = Object.fromEntries(data) as never

      addParams(filters)
    },
    [addParams],
  )

  return (
    <form className="flex gap-3 mt-10 items-end" onSubmit={handleSubmit}>
      <span className="w-[200px]">
        <Select options={companyOptions} label="Empresa" name="organization" />
      </span>
      <span className="w-[200px]">
        <Select options={regionsOptions} label="Região" name="region" />
      </span>
      <div className="flex gap-3">
        <Input
          label="De"
          type="date"
          name="dateBegin"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
        <Input
          label="Até"
          type="date"
          name="dateEnd"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>
      <Button type="submit">Filtrar</Button>
    </form>
  )
}
