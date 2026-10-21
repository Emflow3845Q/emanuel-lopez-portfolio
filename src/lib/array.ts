export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size < 1) throw new RangeError('size debe ser ≥ 1')
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size))
  return pages.length > 0 ? pages : [[]]
}
