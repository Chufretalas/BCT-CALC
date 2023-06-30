import PagePicker from '@/components/PagePicker'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const subjects = [
    { title: "MMQ", href: "/calcs/MMQ" },
    { title: "Código de Hamming", href: "/calcs/hamming_code" },
  ]

  return (
    <>
      <main className='min-h-screen flex flex-col justify-start pt-16 lg:w-[60vw] lg:mx-auto'>
        <PagePicker title={"Escolha uma \"calculadora\""} pages={subjects} />
      </main>
    </>
  )
}
