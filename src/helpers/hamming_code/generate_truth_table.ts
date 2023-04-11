/**
 * @param inputs refers to the number of inputs in the truth table
 */
export default function generateTruthTable(inputs: number): number[][] {

    if (!Number.isInteger(inputs)) {
        inputs = Math.floor(inputs)
    }
    if (inputs <= 0) {
        inputs = 1
    }

    const size = Math.pow(2, inputs)

    let tt: number[][] = []

    for (let i = 0; i < inputs; i++) {
        let row: number[] = []
        let j = 0
        while (row.length < size) {
            for (let k = 0; k < size / Math.pow(2, i + 1); k++) {
                if (j % 2 == 0) {
                    row.push(0)
                } else {
                    row.push(1)
                }
            }
            j++
        }
        tt.push(row)
    }

    return tt
}