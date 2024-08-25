export const formatDateDashboard = (date?: string | null) => {
  if (date) {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(date))
  }

  return null
}
