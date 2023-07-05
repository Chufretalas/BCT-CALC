interface IParseResult {
    x: number[]
    y: number[]
    o: number[]
    erroed: boolean
    errorReason?: string
}

function treatInputStr(str: string): string {
    str = str.replaceAll(/[^0-9,.;-]+/g, "")
    str = str.replaceAll(",", ".")
    return str
}

function parse2Number(array: string): number[] {
    let split = array.split(";")

    split = split.map((value) => { // takes care of multiple .'s
        let chars = value.split("")
        let index = chars.indexOf(".")
        if (index === -1) return value

        let dirtySection = chars.splice(index + 1)
        let cleanSection = dirtySection.filter((char) => char !== ".")

        return chars.concat(cleanSection).join("")
    })

    let filtered = split.filter((value) => value !== "" && !isNaN(+value))
    return filtered.map((value) => +value) as number[]
}


export default function parseInputs(xInput: string, yInput: string, oInput: string): IParseResult {
    xInput = treatInputStr(xInput)
    yInput = treatInputStr(yInput)
    oInput = treatInputStr(oInput)

    let xNumbers = parse2Number(xInput)
    let yNumbers = parse2Number(yInput)
    let oNumbers = parse2Number(oInput)

    if (yNumbers.length !== xNumbers.length
        || xNumbers.length !== oNumbers.length
        || yNumbers.length !== oNumbers.length) {

        return {
            x: xNumbers,
            y: yNumbers,
            o: oNumbers,
            erroed: true,
            errorReason: "x, y e σ devem ter a mesma quantidade de dados"
        }
    }

    return {
        x: xNumbers,
        y: yNumbers,
        o: oNumbers,
        erroed: false
    }

}