import PagePicker from "@/components/PagePicker";

export default function Femec() {

    const calcs = [
        {href: "/materias/FEMEC/MMQ", title: "MMQ"}
    ]

    return (
        <main className='min-h-screen flex flex-col justify-start pt-16 lg:w-[60vw] lg:mx-auto'>
            <PagePicker title="FEMEC: Escolha uma calculadora" pages={calcs} />
        </main>
    )
}