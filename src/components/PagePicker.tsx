import Link from "next/link"

export default function PagePicker({ title, pages }:
    { title: string, pages: { title: string, href: string }[] }) {
    return (
        <section className='flex flex-col items-center'>
            <h2 className="justify-self-start text-lg font-bold">{title}</h2>
            <div className="flex justify-center items-center">
                {
                    pages.map((page, index) => (
                        <button key={index}
                            className="bg-red-200 border-black border-2 
                        rounded-md text-lg font-bold p-4">
                            <Link href={page.href}>
                                {page.title}
                            </Link>
                        </button>
                    ))
                }
            </div>
        </section>
    )
}