"use client"

import { useState } from "react"

export type binary = (0 | 1)[]

export default function HammingCode() {

    const [input, setInput] = useState("")

    const [parsed, setParsed] = useState<binary>([])

    return (
        <main className="min-h-[90vh] flex flex-col justify-start mt-4 px-4 text-xl lg:w-[60vw] lg:mx-auto">
            <div className="bg-custom-green-dark text-white py-1 rounded-lg shadow-lg shadow-slate-600 mb-2 min-w-full">
                <h2 className="pl-2 font-bold">Binário que será enviado</h2>
                <textarea className="bg-black text-2xl
                 rounded-md border-2 w-full border-custom-yellow  min-h-16 pl-2
                 text-white inline" placeholder={"0100100010100101"} value={input}
                    onChange={(e) => setInput(e.currentTarget.value)} cy-data="binaryInput" />
                {parsed.length !== 0 && (
                    <span className=" text-white pb-1 pl-2">
                        {parsed.join(" - ")}
                    </span>
                )}
            </div>

            <span>outra coisa</span>
        </main>
    )
}