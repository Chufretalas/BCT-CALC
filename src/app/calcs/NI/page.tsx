import PagePicker from '@/components/PagePicker'
import { Inter } from 'next/font/google'
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  redirect("/")

  const subjects = [
    { title: "Hamming", href: "/materias/NI/hamming_code" },
  ]

  return (
    <>
      <main className='min-h-screen flex flex-col justify-start pt-16 lg:w-[60vw] lg:mx-auto'>
        <PagePicker title="NI: Escolha uma calculadora" pages={subjects} />
      </main>
    </>
  )
}
