"use client"

import GreenButton from "@/components/GreenButton"
import computeMMQ from "@/helpers/MMQ/compute_mmq"
import parseInputs from "@/helpers/MMQ/parse_inputs"
import IMMQResult from "@/types/immqresults"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

function isZero(value: number) {
    return value === 0
}

export default function MMQ() {

    const [results, setResults] = useState<IMMQResult>({
        o2: 0, x: 0, x2: 0, y: 0, xy: 0, a: 0, b: 0, da: 0, db: 0
    })

    const [xAll, setXAll] = useState<number[]>([])
    const [yAll, setYAll] = useState<number[]>([])
    const [oAll, setOAll] = useState<number[]>([])
    const [error, setError] = useState("")

    const [xInput, setXInput] = useState("")
    const [yInput, setYInput] = useState("")
    const [oInput, setOInput] = useState("")

    useEffect(() => {
        const result = parseInputs(xInput, yInput, oInput)
        setXAll(result.x)
        setYAll(result.y)
        setOAll(result.o)
        if (result.erroed) {
            setError(result.errorReason!)
        } else {
            setError("")
        }
    }, [xInput, yInput, oInput])

    return (
        <main className="min-h-[90vh] flex flex-col justify-start mt-4 px-4 text-xl lg:w-[60vw] lg:mx-auto">
            <div className="flex flex-col gap-y-2">

                <button className="text-sm my-4 bg-custom-green-light text-white rounded-full" onClick={() => {
                    let confirmExample: boolean = confirm("Essa ação apagará quaisquer dados nas caixas de input.\nDeseja ver o exemplo?")
                    if (!confirmExample) return
                    setXInput("1; 2; 3; 4; 5; 6 somente números . , ou ; são lidos")
                    setYInput("1; 1.5; 4; 4,5; 5.8; 7")
                    setOInput("0.3; 0.3; 0.5; 0.2; 0.4; 0.6 clique no botão no fim da página.")
                }}>Clique aqui para ver um exemplo de como inserir os dados</button>

                <div className="bg-custom-green-dark text-white py-1 rounded-lg shadow-lg shadow-slate-600 mb-2">
                    <h2 className="pl-2 font-bold">X</h2>
                    <ValueInput placeholder="valores de x" value={xInput} callback={setXInput} />
                    {xAll.length !== 0 && (
                        <span className=" text-white pb-1 pl-2">
                            {xAll.join(" - ")}
                        </span>
                    )}
                </div>
                <div className="bg-custom-green-dark text-white py-1 rounded-lg shadow-lg shadow-slate-600 mb-2">
                    <h2 className="pl-2 font-bold">Y</h2>
                    <ValueInput placeholder="valores de y" value={yInput} callback={setYInput} />
                    {yAll.length !== 0 && (
                        <span className=" text-white pb-1 pl-2">
                            {yAll.join(" - ")}
                        </span>
                    )}
                </div>
                <div className="bg-custom-green-dark text-white py-1 rounded-lg shadow-lg shadow-slate-600 mb-2">
                    <h2 className="pl-2 font-bold">σ</h2>
                    <ValueInput placeholder="valores de σ" value={oInput} callback={setOInput} />
                    {oAll.length !== 0 && (
                        <span className=" text-white pb-1 pl-2">
                            {oAll.join(" - ")}
                        </span>
                    )}
                </div>
            </div>
            {error !== "" && (
                <span className="text-red-600 font-bold text-lg">{error}</span>
            )}
            <table className="table-auto border-2 border-slate-900 my-3 text-md w-10/12 mx-auto">
                <tbody>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">σ2</th>
                        <th>{results.o2}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">x</th>
                        <th>{results.x}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">x2</th>
                        <th>{results.x2}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">y</th>
                        <th>{results.y}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">xy</th>
                        <th>{results.xy}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">a</th>
                        <th>{results.a}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">b</th>
                        <th>{results.b}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">∆a</th>
                        <th>{results.da}</th>
                    </tr>
                    <tr className="odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white">
                        <th className="border-r-2 border-slate-900">∆b</th>
                        <th>{results.db}</th>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center">
                <GreenButton>
                    <button onClick={() => {
                        if (error !== "") {
                            alert(error)
                            return
                        }
                        if (xAll.length === 0) {
                            alert("Insira algum valor nas caixas de texto")
                            return
                        }

                        if (xAll.some(isZero) || yAll.some(isZero) || oAll.some(isZero)) {
                            alert("0 não é um valor válido nos conjuntos de dados")
                            return
                        }
                        setResults(computeMMQ(xAll, yAll, oAll))
                    }}
                    >Calcular</button>
                </GreenButton>
            </div>

        </main>
    )
}

function ValueInput({ placeholder, value, callback }:
    { placeholder: string, value: string, callback: Dispatch<SetStateAction<string>> }) {
    return (
        <textarea className="bg-black 
        rounded-md border-2 w-full border-custom-yellow  min-h-16 pl-2
         text-white inline" placeholder={placeholder} value={value}
            onChange={e => callback(e.currentTarget.value)} />
    )
}