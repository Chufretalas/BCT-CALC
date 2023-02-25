import PagePicker from "@/components/PagePicker";

export default function Femec() {

    const calcs = [
        {href: "/materias/FEMEC/MMQ", title: "MMQ"}
    ]

    return (
        <main className=''>
            <PagePicker title="Escolha uma calculadora" pages={calcs} />
        </main>
    )
}