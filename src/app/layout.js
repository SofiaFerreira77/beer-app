import { Unbounded } from 'next/font/google'
import { BeerProvider } from '@/data/context/BeerContext'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import './globals.css'

const unbounded = Unbounded({
  weight: ['300', '600', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
})

export const metadata = {
  title: 'Frontend Case: BeerApp',
  description: 'Nextjs app developed by Sofia Ferreira',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={unbounded.className}>
        <div className={`bg-white_2 min-h-screen pb-20`}>
          <Header title="BeerApp" />
          <main className="relative z-10 bg-white_2 pt-20 mb-60">
            <BeerProvider>
              {children}
            </BeerProvider>
          </main>
          <Footer developer={{ label: 'Soberly Crafted by:', name: "Sofia Ferreira", link: 'https://github.com/SofiaFerreira77/beer-collection-case' }} />
        </div>
      </body>
    </html>
  )
}
