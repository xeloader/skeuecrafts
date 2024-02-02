export function normalize (value: number, actualMin: number, actualMax: number, min: number, max: number): number {
  if (actualMin === actualMax) {
    throw new Error('actualMin and actualMax cannot be the same value')
  }
  return min + ((value - actualMin) * (max - min)) / (actualMax - actualMin)
}
