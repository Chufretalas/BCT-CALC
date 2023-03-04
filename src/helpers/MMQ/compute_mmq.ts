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

    result.x2 = (1 / result.o2) * xAll.reduce((acc, value, index) => {
        return acc + Math.pow(value, 2) / squaredO[index]
    }, 0)

    result.y = (1 / result.o2) * yAll.reduce((acc, value, index) => {
        return acc + value / squaredO[index]
    }, 0)

    result.xy = (1 / result.o2) * yAll.reduce((acc, value, index) => {
        return acc + (value * xAll[index]) / squaredO[index]
    }, 0)

    result.a = (result.x * result.y - result.xy) / (Math.pow(result.x, 2) - result.x2)

    result.b = result.y - result.a * result.x

    result.da = Math.sqrt((1/result.o2)/(result.x2 - Math.pow(result.x, 2)))

    result.db = Math.sqrt((result.x2/result.o2)/(result.x2 - Math.pow(result.x, 2)))

    return result
}