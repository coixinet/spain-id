declare module 'spain-id' {
    export const validateSpanishId: (x: string) => boolean
    export const spainIdType: (x: string) => string
    export const validNIE: (x: string) => boolean
    export const validCIF: (x: string) => boolean
}