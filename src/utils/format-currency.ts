export const formatCurrency = (price?: number) => {
  if (price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return '0,00'
}
