'use client'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import { useUrlParams } from '@/hooks/use-params'
import { ICompany } from '@/http/companies/get-companies'
import { IRegions } from '@/http/regions/get-regions'
import { FormEvent, useMemo } from 'react'

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
      { label: '', value: '' },
      ...regions.items.map((region) => ({
        label: region.name,
        value: region.id,
      })),
    ],
    [regions.items],
  )

  const handleChangeFilter = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.currentTarget
    addParams({ [name]: value })
  }

  return (
    <div className="flex gap-3 justify-center">
      <span className="w-[200px]">
        <Select
          options={companyOptions}
          label="Empresa"
          name="organization"
          onChange={handleChangeFilter}
        />
      </span>
      <span className="w-[200px]">
        <Select
          options={regionsOptions}
          label="Região"
          name="region"
          onChange={handleChangeFilter}
        />
      </span>
      <div className="flex gap-3">
        <Input
          label="De"
          type="date"
          name="dateBegin"
          onChange={handleChangeFilter}
          defaultValue={new Date().toISOString().split('T')[0]}
        />
        <Input
          label="Até"
          type="date"
          name="dateEnd"
          onChange={handleChangeFilter}
          defaultValue={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  )
}
