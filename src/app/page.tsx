import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <header className='flex justify-center'>
        <h1 className='text-xl font-bold'>BCT-CALC</h1>
      </header>
      <main>
        <section className='flex flex-col items-center'>
          <h2>Escolha uma matéria</h2>
          <div>
            <button>FEMEC</button>
          </div>
        </section>
      </main>
      <footer className='flex justify-center'>
        <span className='text-sm'>Chufretalas 2023</span>
      </footer>
    </>
  )
}
