export default function findAllIndexes<T>(arr: T[], target: T): number[] {
    const finds: number[] = []
    arr.forEach((v, index) => {
        if (v === target) {
            finds.push(index)
        }
    })
    return finds
}