export const formatScore = (score: number): number => {
  const maxScore = 1000

  return (score / maxScore) * 100
}
