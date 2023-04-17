import { binarySeq } from "@/types/binary_seq";
import { parityType } from "@/types/parity_type";
import findAllIndexes from "../find_all_indexes";
import generateTruthTable from "./generate_truth_table";
import getParity from "./get_parity";
import getParityBitCount from "./get_parity_bit_count";

export default function doTheHamming(source: binarySeq, parity: parityType) {

    const parityCount = getParityBitCount(source)
    const fullSize = parityCount + source.length
    const tt = generateTruthTable(parityCount)

    const parityPositions = []

    for (let i = 0; i < parityCount; i++) {
        parityPositions.push(Math.pow(2, i))
    }

    let finalData: ((0 | 1) | "X")[] = []

    const sourceCopy = [...source]
    let i = 1;
    while (finalData.length < fullSize) {
        if (parityPositions.includes(i)) {
            finalData.push("X")
        }
        else {
            finalData.push(sourceCopy.splice(0, 1)[0])
        }
        i++
    }

    // time to get the responsabilities

    let resp: number[][] = []

    tt.forEach((row) => {
        resp.push(findAllIndexes(row, 1))
    })

    resp.reverse()

    // populate the parity bits

    resp.forEach((pBitResp) => {
        const finDataSlice: binarySeq = []
        for (let i = 0; i < pBitResp.length; i++) {
            const respIndex = pBitResp[i] - 1 //this -1 is to convert the position to an index

            if (respIndex >= finalData.length) {
                break
            }

            if (finalData[respIndex] !== "X") {
                finDataSlice.push(finalData[respIndex] as (0 | 1))
            }
        }

        finalData[pBitResp[0] - 1] = getParity(finDataSlice, parity)
    })

    return {
        parityCount,
        parityPositions,
        parityResp: resp,
        finalData: finalData as binarySeq,
    }

}