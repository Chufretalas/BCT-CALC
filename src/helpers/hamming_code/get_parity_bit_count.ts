import { binarySeq } from "@/types/binary_seq";

export default function getParityBitCount(message: binarySeq): number {

    let count = 1
    let messageLen = message.length

    while (true) {
        if (Math.pow(2, count) >= count + messageLen + 1) {
            break
        }
        count++
    }
    
    return count
}