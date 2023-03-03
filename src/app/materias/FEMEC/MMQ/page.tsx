"use client"

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
        <main className="min-h-[80vh] mt-10 w-4/5 self-center">
            <div className="flex flex-col gap-y-2">
                <ValueInput placeholder="valores de x" value={xInput} callback={setXInput} />
                <span>{xAll.join(" - ")}</span>
                <ValueInput placeholder="valores de y" value={yInput} callback={setYInput} />
                <span>{yAll.join(" - ")}</span>
                <ValueInput placeholder="valores da incerteza de y (σ)" value={oInput} callback={setOInput} />
                <span>{oAll.join(" - ")}</span>
            </div>
            {error !== "" && (
                <span className="text-red-800 font-bold text-lg">{error}</span>
            )}
            <div className="flex flex-col">
                <span>{`σ2 = ${results.o2}`}</span>
                <span>{`x = ${results.x}`}</span>
                <span>{`x2 = ${results.x2}`}</span>
                <span>{`y = ${results.y}`}</span>
                <span>{`xy = ${results.xy}`}</span>
                <span>{`a = ${results.a}`}</span>
                <span>{`b = ${results.b}`}</span>
                <span>{`∆a = ${results.da}`}</span>
                <span >{`∆b = ${results.db}`}</span>
            </div>
            <button onClick={() => {
                if(error !== "") {
                    alert(error)
                    return
                }
                if(xAll.length === 0) {
                    alert("Insira algum valor nas caixas de texto")
                    return
                }

                if(xAll.some(isZero) || yAll.some(isZero) || oAll.some(isZero)) {
                    alert("0 não é um valor válido nos conjuntos de dados")
                    return
                }
                setResults(computeMMQ(xAll, yAll, oAll))
                alert("não ta pronto ainda, mas ta perto")
            }}
                className="bg-black text-white text-lg font-bold 
                flex justify-center items-center px-4 py-2 
                rounded-lg border-4 border-red-500
                mx-auto">Calcular</button>
        </main>
    )
}

function ValueInput({ placeholder, value, callback }:
    { placeholder: string, value: string, callback: Dispatch<SetStateAction<string>> }) {
    return (
        <textarea className="bg-black 
        rounded-lg border-2 w-full m-auto border-red-500  min-h-16 pl-2
         text-white inline" placeholder={placeholder} value={value}
            onChange={e => callback(e.currentTarget.value)} />
    )
}