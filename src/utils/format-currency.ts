export const formatCurrency = (price?: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  if (price) {
    return formatter.format(price)
  }

  return formatter.format(0)
}
