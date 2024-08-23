'use client'

import { Button } from '@/components/form/button'
import { useUrlParams } from '@/hooks/use-params'
import { useCallback } from 'react'

export const ChangeTableButton = () => {
  const { addParams, params } = useUrlParams()
  const selectedTable = params.get('table')

  const isCustomerTable = selectedTable === 'expenses'
  const selectTableButtonLabel = isCustomerTable ? 'Clientes' : 'Despesas'

  const handleSelectTable = useCallback(() => {
    addParams({
      table: selectedTable === 'expenses' ? 'customers' : 'expenses',
    })
  }, [addParams, selectedTable])

  return <Button onClick={handleSelectTable}>{selectTableButtonLabel}</Button>
}
