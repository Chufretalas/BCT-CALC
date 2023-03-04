import PagePicker from '@/components/PagePicker'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const subjects = [
    { title: "FEMEC", href: "/materias/FEMEC" },
  ]

  return (
    <>
      <main className='min-h-screen flex flex-col justify-start pt-16 lg:w-[60vw] lg:mx-auto'>
        <PagePicker title="Escolha uma matéria" pages={subjects} />
      </main>
    </>
  )
}
