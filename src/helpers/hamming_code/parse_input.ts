import { binarySeq } from "@/types/binary_seq";

export default function parseInput(rawInput: string): binarySeq {
    const filtered = rawInput.split("").filter((s) => s === "0" || s === "1")
    const final = filtered.map((s) => +s) as binarySeq
    return final ?? []
}