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
        parityPositions.push(Math.pow(2, i)) //this is a 0 index base position, not a 1 index base like is shown in the UI
    }

    let finalData: ((0 | 1) | "X")[] = []


    const sourceCopy = [...source]
    let i = 0;
    while (finalData.length < fullSize) {
        if (parityPositions.includes(i + 1)) {
            finalData.push("X")
        }
        else {
            finalData.push(sourceCopy.splice(0, 1)[0])
        }
        i++
    }

    // time to get the responsabilities

    let resp: number[][] = [] // this is also zero index based

    tt.forEach((row) => {
        resp.push(findAllIndexes(row, 1).map(v => v - 1))
    })

    resp.reverse()

    // populate the parity bits

    resp.forEach((pBitResp, pBitIndex) => {
        const finDataSlice: (0 | 1)[] = []
        pBitResp.forEach((respIndex) => {
            if (finalData[respIndex] !== "X" && finalData.length > respIndex) { // TODO: change this to regular for and break when the respIndex gets out of bounds instead of looping and doing nothing
                finDataSlice.push(finalData[respIndex] as (0 | 1))
            }
        })
        finalData[pBitResp[0]] = getParity(finDataSlice, parity)
    })

    return {
        parityCount,
        parityPositions,
        parityResp: resp,
        finalData: finalData as binarySeq,
    }

}