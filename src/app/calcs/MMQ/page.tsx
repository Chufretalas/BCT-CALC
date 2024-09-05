"use client"

import GreenButton from "@/components/GreenButton"
import computeMMQ from "@/helpers/MMQ/compute_mmq"
import IMMQResult from "@/types/immqresults"
import { useEffect, useState } from "react"

function isZero(value: number) {
    return value === 0
}

interface InputRow {
    x: number | undefined
    y: number | undefined
    o: number | undefined
}

export default function MMQ() {

    const [results, setResults] = useState<IMMQResult>({
        o2: 0, x: 0, x2: 0, y: 0, xy: 0, a: 0, b: 0, da: 0, db: 0
    })

    const [tableRows, setTableRows] = useState<InputRow[]>([{ x: undefined, y: undefined, o: undefined }])

    const [changed, setChanged] = useState(false)

    useEffect(() => {

        setChanged(true)
    }, [tableRows])

    return (
        <main className="min-h-[90vh] flex flex-col justify-start mt-4 px-4 text-xl lg:w-[80vw] lg:mx-auto">
            <div className="flex flex-col gap-y-2 justify-center items-center">

                <button className="text-sm my-4 bg-custom-green-light text-white rounded-full px-4" onClick={() => {
                    let confirmExample: boolean = confirm("Essa ação apagará quaisquer dados nas caixas de input.\nDeseja ver o exemplo?")
                    if (!confirmExample) return
                    setTableRows([
                        { x: 1, y: 1, o: 0.3 },
                        { x: 2, y: 1.5, o: 0.3 },
                        { x: 3, y: 4, o: 0.5 },
                        { x: 4, y: 4.5, o: 0.2 },
                        { x: 5, y: 5.8, o: 0.4 },
                        { x: 6, y: 7, o: 0.6 },
                    ])
                }} cy-data="example">Clique aqui para ver um exemplo de como inserir os dados</button>

                <table className="table-fixed w-full mx-auto">
                    <thead onClick={() => console.log(tableRows)}>
                        <tr>
                            <th className="bg-custom-green-light text-custom-yellow rounded-tl-xl w-[30%]">X</th>
                            <th className="bg-custom-green-light text-custom-yellow w-[30%]">Y</th>
                            <th className="bg-custom-green-light text-custom-yellow rounded-tr-xl w-[30%]">σ</th>
                            <th className="w-auto"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {tableRows.map((row, idx) => (
                            <tr key={idx} className="[&>td>input]:odd:bg-gray-200 [&>td:has(>input)]:odd:bg-gray-200">
                                <td className="border-2 border-black w-full">
                                    <input className="text-right w-full font-semibold" placeholder={`${idx + 1}º valor de X`}
                                        type="number" name={`ipt_x_${idx}`} id={`ipt_x_${idx}`} value={row.x ?? ""} onChange={e => {
                                            const newTableRows = [...tableRows]
                                            newTableRows[idx].x = +e.currentTarget.value
                                            setTableRows(newTableRows)
                                        }
                                        } />
                                </td>
                                <td className="border-2 border-black w-full">
                                    <input className="text-right w-full font-semibold" placeholder={`${idx + 1}º valor de Y`}
                                        type="number" name={`ipt_y_${idx}`} id={`ipt_y_${idx}`} value={row.y ?? ""} onChange={e => {
                                            const newTableRows = [...tableRows]
                                            newTableRows[idx].y = +e.currentTarget.value
                                            setTableRows(newTableRows)
                                        }
                                        } />
                                </td>
                                <td className="border-2 border-black w-full">
                                    <input className="text-right w-full font-semibold" placeholder={`${idx + 1}º valor de σ`}
                                        type="number" name={`ipt_o_${idx}`} id={`ipt_o_${idx}`} value={row.o ?? ""} onChange={e => {
                                            const newTableRows = [...tableRows]
                                            newTableRows[idx].o = +e.currentTarget.value
                                            setTableRows(newTableRows)
                                        }
                                        } />
                                </td>
                                <td className="w-[25px]">
                                    <button className="text-sm bg-red-700 hover:bg-red-800 text-white ml-2 py-2 px-3 font-semibold rounded-md "
                                        tabIndex={-1} onClick={() => {
                                            const newTableRows = [...tableRows]
                                            newTableRows.splice(idx, 1)
                                            setTableRows(newTableRows)
                                        }}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="py-2 px-3 bg-blue-500 text-white font-semibold text-base rounded-full drop-shadow-lg
                             hover:bg-blue-600 active:scale-90 duration-75 mb-5"
                    tabIndex={-1} onClick={() => {
                        setTableRows([...tableRows, { x: undefined, y: undefined, o: undefined }])
                    }}>Adicionar Linha</button>
            </div>

            <div className="flex justify-center mt-2">
                <button onClick={() => {
                    const xAll = tableRows.map(row => row.x ?? 0)
                    const yAll = tableRows.map(row => row.y ?? 0)
                    const oAll = tableRows.map(row => row.o ?? 0)

                    if (xAll.some(isZero) || yAll.some(isZero) || oAll.some(isZero)) {
                        alert("0 não é um valor válido nos conjuntos de dados\nNão deixe nenhum campo da tabela não preenchido")
                        return
                    }
                    setResults(computeMMQ(xAll, yAll, oAll))
                    setChanged(false)
                }}
                    cy-data="computeButton">
                    <GreenButton>
                        {changed ? "Calcular *" : "Calcular"}
                    </GreenButton>
                </button>
            </div>
            <table className="table-auto border-2 border-slate-900 my-3 text-md w-8/12 mx-auto">
                <tbody>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">σ2</th>
                        <th cy-data="o2Result">{results.o2}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">x</th>
                        <th cy-data="xResult">{results.x}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">x2</th>
                        <th cy-data="x2Result">{results.x2}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">y</th>
                        <th cy-data="yResult">{results.y}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">xy</th>
                        <th cy-data="xyResult">{results.xy}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">a</th>
                        <th cy-data="aResult">{results.a}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">b</th>
                        <th cy-data="bResult">{results.b}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">∆a</th>
                        <th cy-data="daResult">{results.da}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">∆b</th>
                        <th cy-data="dbResult">{results.db}</th>
                    </tr>
                </tbody>
            </table>


        </main>
    )
}
