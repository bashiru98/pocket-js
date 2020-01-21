// Inspiration: https://github.com/golang/go/blob/master/src/encoding/hex/hex.go
/**
 *
 *
 * @class Hex
 * @deprecated
 * This class provides a TypeScript implementation of the Hex format
 */
export class Hex {
    /**
     *
     *  Encodes str into an array of bytes. After that using bitwise operations we transform each byte into an hexadecimal value.
     * @param {String} str - String value to be encoded.
     * @returns {String} - Encoded value.
     */

    public static encodeToString(str: string): string {
        const encoded: string[] = this.encode(str)
        return encoded.join("")
    }

    /**
     *
     *  Decodes hex into an redable string. This function expects that hex contains only hexadecimal characters and that hex has even length.
     * @param {String} hex - Encoded value to be decoded.
     * @returns {String} - Encoded value.
     */
    public static decodeString(hex: string) {
        let text = ""
        for (let i = 0; i < hex.length; i += 2) {
            text += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
        }
        return text
    }

    private static readonly alphabet: string[] = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
    ]

    private static encode(str: string): string[] {
        const value = this.toByteArray(str)
        const result: string[] = []

        let count = 0
        value.forEach(byte => {
            result[count] = this.alphabet[byte >> 4]
            result[count + 1] = this.alphabet[byte & 0x0f]

            count = count + 2
        })

        return result
    }

    private static toByteArray(str: string): number[] {
        const utf8: number[] = []
        for (let index = 0; index < str.length; index++) {
            let charcode = str.charCodeAt(index)
            if (charcode < 0x80) {
                utf8.push(charcode)
            } else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
            } else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(
                    0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f)
                )
            } else {
                index++
                charcode =
                    0x10000 +
                    (((charcode & 0x3ff) << 10) |
                        (str.charCodeAt(index) & 0x3ff))
                utf8.push(
                    0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f)
                )
            }
        }
        return utf8
    }
}
