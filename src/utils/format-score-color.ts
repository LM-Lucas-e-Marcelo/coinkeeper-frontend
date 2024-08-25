export const formatScoreColors = (score: number) => {
  if (score <= 250) return 'red'
  if (score <= 500) return 'orange'
  if (score <= 750) return 'yellow'
  if (score > 750) return 'green'
}
