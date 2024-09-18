export const formatScoreColors = (score: number) => {
  if (score <= 250) return '#FF0000'
  if (score <= 500) return '#FFAC1C'
  if (score <= 750) return '#FFFF00'
  if (score > 750) return '#00FF00'
}
