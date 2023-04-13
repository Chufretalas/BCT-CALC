"use client"

import GreenButton from "@/components/GreenButton"
import doTheHamming from "@/helpers/hamming_code/do_the_hamming"
import parseInput from "@/helpers/hamming_code/parse_input"
import { binarySeq } from "@/types/binary_seq"
import IHammedResult from "@/types/IHammedResult"
import { parityType } from "@/types/parity_type"
import { useEffect, useState } from "react"


export default function HammingCode() {

    const [parity, setParity] = useState<parityType>("even")

    const [changed, setChanged] = useState(false)

    const [input, setInput] = useState("")

    const [parsed, setParsed] = useState<binarySeq>([])

    const [error, setError] = useState("binário de input vazio!")

    const [hammedResult, setHammedResult] = useState<IHammedResult>({ finalData: [], parityCount: 0, parityPositions: [], parityResp: [] })

    return (
        <main className="min-h-[90vh] flex flex-col justify-start mt-4 px-4 text-xl lg:w-[60vw] lg:mx-auto">
            <div className="bg-custom-green-dark text-white py-1 rounded-lg shadow-lg shadow-slate-600 mb-2 min-w-full">
                <h2 className="pl-2 font-bold">Binário que será enviado</h2>
                <textarea className="bg-black text-2xl
                 rounded-md border-2 w-full border-custom-yellow  min-h-16 pl-2
                 text-white inline" placeholder={"0100100010100101"} value={input}
                    onChange={(e) => {
                        setInput(e.currentTarget.value)
                        setChanged(true)
                    }}
                    onKeyUp={(e) => {
                        const parsedTemp = parseInput(input)
                        setParsed(parsedTemp)
                        if (parsedTemp.length === 0) {
                            setError("binário de input vazio!")
                        } else {
                            setError("")
                        }
                    }}
                    cy-data="binaryInput" />
                {parsed.length !== 0 && (
                    <span className=" text-white pb-1 pl-2">
                        {parsed.join(" ")}
                    </span>
                )}
            </div>
            {error !== "" && (
                <span className="text-red-600 font-bold text-lg">{error}</span>
            )}
            <h2 className="mt-2 font-bold">Tipo de paridade:</h2>
            <form className="flex justify-around mt-2 mb-4">
                <fieldset className="bg-custom-green-light text-white py-1 px-4 rounded-full
                     min-w-[5.5rem] flex justify-center shadow-sm"
                    onClick={() => {
                        setParity("even")
                        setChanged(true)
                    }}>
                    <input type="radio" id="even" name="parity_type" value="even"
                        className="mr-1" checked={parity === "even"} />
                    <label htmlFor="even">Par</label>
                </fieldset>
                <fieldset className="bg-custom-green-light text-white py-1 px-4 rounded-full
                     min-w-[5.5rem] flex justify-center shadow-sm"
                    onClick={() => {
                        setParity("odd")
                        setChanged(true)
                    }}>
                    <input type="radio" id="odd" name="parity_type" value="odd"
                        className="mr-1" checked={parity === "odd"} />
                    <label htmlFor="odd">Ímpar</label>
                </fieldset>
            </form>

            <button className="mx-auto" onClick={() => {
                if (error !== "") {
                    return
                }
                const hammedResultTemp = doTheHamming(parsed, parity)
                console.log(hammedResultTemp);
                
                setHammedResult(hammedResultTemp)
                setChanged(false)
            }}>
                <GreenButton>{changed ? "Calcular *" : "Calcular"}</GreenButton>
            </button>

            <hr className="mt-4 mb-2" />

            {/* ANSWER */}
            <section>
                <h3 className="text-center font-bold underline mt-6 lg:mt-1">Dados Hammezados</h3>
                <table className="table-auto border-2 border-slate-900 my-1 text-md min-w-10/12 mx-auto text-center">
                    <thead>
                        <tr className="bg-custom-green-dark text-custom-yellow">
                            <th className="px-1">Tipo</th>
                            <th className="px-1 border-x-2 border-black">Posição</th>
                            <th className="px-1">Dados</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {hammedResult.finalData.map((v, i) => {
                            return (
                                <tr className={` ${hammedResult.parityPositions.includes(i+1)
                                    ? "bg-red-300 text-black border-2 border-black"
                                    : "odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white"}`}
                                    key={i}>
                                    <td className="text-start">{hammedResult.parityPositions.includes(i+1)
                                        ? `Paridade-(${hammedResult.parityPositions.indexOf(i+1) + 1})`
                                        : "Dado"}</td>
                                    <td className="border-x-2 border-black">{i + 1}</td>
                                    <td className="">{v}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <hr className="mt-4 mb-2" />
                <h3 className="text-center font-bold underline mt-6 lg:mt-1">Responsabilidades das paridades</h3>
                <table className="table-auto border-2 border-slate-900 my-1 text-md w-10/12 mx-auto text-center">
                    <thead>
                        <tr className="bg-custom-green-dark text-custom-yellow">
                            <th className="border-2 border-black">Bit</th>
                            <th>Posições</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hammedResult.parityPositions.map((v, i) => {
                            return (
                                <tr className="text-sm odd:bg-slate-200 odd:text-black even:bg-slate-700 even:text-white border-2 border-black" key={i}>
                                    <td className="border-2 border-black font-bold">{`P-(${i + 1})`}</td>
                                    <td>{hammedResult.parityResp[i].map((e) => e + 1).join(" - ")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    )
}