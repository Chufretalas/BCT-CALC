import IMMQResult from "@/types/immqresults";

export default function computeMMQ(xAll: number[], yAll: number[], oAll: number[]): IMMQResult {

    let result = {
        o2: 0,
        x: 0,
        x2: 0,
        y: 0,
        xy: 0,
        a: 0,
        b: 0,
        da: 0,
        db: 0,
    }

    const squaredO = oAll.map((value) => Math.pow(value, 2))

    result.o2 = squaredO.reduce((acc, value) => {
        return acc + 1 / value
    }, 0)

    result.x = (1 / result.o2) * xAll.reduce((acc, value, index) => {
        return acc + value / squaredO[index]
    }, 0)

    return result
}