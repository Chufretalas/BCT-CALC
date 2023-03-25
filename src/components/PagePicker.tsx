import Link from "next/link"
import GreenButton from "./GreenButton"

export default function PagePicker({ title, pages }:
    { title: string, pages: { title: string, href: string }[] }) {
    return (
        <section className='flex flex-col justify-center gap-8 items-center h-full'>
            <h2 className="justify-self-start text-lg font-bold bg-slate-200 shadow-md shadow-slate-600
            pl-2 p-1 border-l-4 border-l-blue-500
            self-start justify-start inline">{title}</h2>
            <div className="flex justify-center items-center gap-4">
                {
                    pages.map((page, index) => (
                        <Link href={page.href} key={index}>
                            <GreenButton >
                                <div className="min-w-[4rem] text-center">
                                    {page.title}
                                </div>
                            </GreenButton>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}