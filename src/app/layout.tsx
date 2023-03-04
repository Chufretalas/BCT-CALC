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
      <body className='flex flex-col justify-between min-h-screen'>
        <header className='flex justify-center'>
          <Link className='text-xl font-bold' href={"/"}>BCT-CALC</Link>
        </header>
        {children}
        <footer className='flex justify-center'>
          <span className='text-sm'>Chufretalas 2023</span>
        </footer>
      </body>
    </html>
  )
}
