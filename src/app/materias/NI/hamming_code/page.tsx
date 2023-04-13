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
                        className="mr-1" checked={parity === "even"} onChange={() => console.log("even")} />
                    <label htmlFor="even">Par</label>
                </fieldset>
                <fieldset className="bg-custom-green-light text-white py-1 px-4 rounded-full
                     min-w-[5.5rem] flex justify-center shadow-sm"
                    onClick={() => {
                        setParity("odd")
                        setChanged(true)
                    }}>
                    <input type="radio" id="odd" name="parity_type" value="odd"
                        className="mr-1" checked={parity === "odd"} onChange={() => console.log("odd")} />
                    <label htmlFor="odd">Ímpar</label>
                </fieldset>
            </form>

            <button className="mx-auto" onClick={() => {
                if (error !== "") {
                    return
                }
                const hammedResultTemp = doTheHamming(parsed, parity)
                console.log(hammedResultTemp) //TODO: remove after debugging
                setHammedResult(hammedResultTemp)
                setChanged(false)
            }}>
                <GreenButton>{changed ? "Calcular *" : "Calcular"}</GreenButton>
            </button>

            <hr className="mt-4 mb-2" />

            {/* ANSWER */}
            <section>
                <span onClick={() => console.log(doTheHamming(parsed, "even"))}>dnasdsa</span>
            </section>
        </main>
    )
}