"use client"

import Heading from '@/components/ui/Heading'
import { useBeerContext } from '@/data/context/BeerContext'
import Link from 'next/link'
import BeerList from '@/components/BeerList'
import BeerRefinements from '@/components/BeerRefinements'

export default function Home() {
  const { allBeers } = useBeerContext();

  return (
    <>
      <Heading title="All Beers" />

      <div className="w-full flex justify-center">
        <Link href="/"
          className={`bg-gray text-yellow rounded-xl p-3 text-center hover:bg-gray_2 hover:text-white`}>Back to Collection</Link>
      </div>

      <BeerRefinements />

      <BeerList beers={allBeers.data} loading={allBeers.loading} showCollectionOnly={false} />
    </>
  )
}
