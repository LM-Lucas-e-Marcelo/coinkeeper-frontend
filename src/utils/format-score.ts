export const formatScore = (score: number): string => {
  const maxScore = 1000

  return `${(score / maxScore) * 100}%`
}
