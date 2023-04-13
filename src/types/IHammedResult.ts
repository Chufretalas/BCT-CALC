import { binarySeq } from "./binary_seq";

export default interface IHammedResult {
    parityCount: number;
    parityPositions: number[];
    parityResp: number[][];
    finalData: binarySeq;
}