export function snake2camel (obj: any): any {
  if (typeof (obj) === 'string') {
    return (obj).replace(
      /(_.)/,
      (match: string) => match.replace('_', '').toUpperCase()
    )
  }

  const out: any = {}
  Object.keys(obj).forEach((k: string) => {
    const camelKey = snake2camel(k) as string
    out[camelKey] = obj[k]
  })
  return out
}
