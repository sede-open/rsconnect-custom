export function snake2camel(obj: any): any {
    if (typeof (obj) === "string") {
        return (obj as string).replace(
            /(_.)/,
            (match: string) => match.replace("_", "").toUpperCase()
        )
    }

    let out: any = {}
    Object.keys(obj).forEach((k: string) => {
        const camelKey = snake2camel(k) as string
        out[camelKey] = obj[k]
    })
    return out
}