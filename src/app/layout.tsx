import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'BCT-CALC',
  description: 'Calculadora de matérias da UFABC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className='min-h-screen'>
        <header className='flex justify-center bg-gradient-to-b
         from-custom-green-light to-custom-green-dark text-custom-yellow'>
          <Link className='text-2xl font-bold' href={"/"}>BCT-CALC</Link>
        </header>
        {children}
        <footer className='flex justify-center items-center relative bottom-0 w-full mx-auto'>
          <span className='text-sm'>
            <Link href='https://github.com/Chufretalas/BCT-CALC' target="_blank">
              Chufretalas 2023
            </Link>
          </span>
        </footer>
      </body>
    </html>
  )
}
