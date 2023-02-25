"use client"

import { Dispatch, SetStateAction, useState } from "react"

export default function MMQ() {

    let o2 = 0, x = 0, x2 = 0, y = 0, xy = 0, a = 0, b = 0, da = 0, db = 0

    const [xInput, setXInput] = useState("")
    const [yInput, setYInput] = useState("")
    const [oInput, setOInput] = useState("")


    return (
        <main className="min-h-[80vh] mt-10 w-4/5 self-center">
            <div className="flex flex-col gap-y-2">
                <ValueInput placeholder="valores de x" value={xInput} callback={setXInput} />
                <ValueInput placeholder="valores de y" value={yInput} callback={setYInput} />
                <ValueInput placeholder="valores da incerteza de y (σ)" value={oInput} callback={setOInput} />
            </div>
            <div className="flex flex-col">
                <span>{`σ2 = ${o2}`}</span>
                <span>{`x = ${x}`}</span>
                <span>{`x2 = ${x2}`}</span>
                <span>{`y = ${y}`}</span>
                <span>{`xy = ${xy}`}</span>
                <span>{`a = ${a}`}</span>
                <span>{`b = ${b}`}</span>
                <span>{`∆a = ${da}`}</span>
                <span >{`∆b = ${db}`}</span>
            </div>
            <button onClick={() => {
                console.log(xInput)
                console.log(yInput)
                console.log(oInput)
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