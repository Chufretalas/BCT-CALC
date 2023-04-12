import { binarySeq } from "@/types/binary_seq";
import { parityType } from "@/types/parity_type";
import findAllIndexes from "../find_all_indexes";

export default function getParity(source: binarySeq, type: parityType): (0 | 1) {
    // console.log(source) // gonna leave this here for easier debugging
    const oneCount = findAllIndexes(source, 1).length
    if (oneCount % 2 === 0) {
        if (type === "even") {
            return 0
        } else {
            return 1
        }
    } else {
        if (type === "even") {
            return 1
        } else {
            return 0
        }
    }
}