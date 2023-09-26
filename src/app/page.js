"use client"

import Heading from '@/components/ui/Heading'
import { useBeerContext } from '@/data/context/BeerContext'
import Link from 'next/link'
import BeerList from '@/components/BeerList'

export default function Home() {
  const { collectionBeers } = useBeerContext();

  return (
    <>
      <Heading title="My Collection" />

      <div className="w-full flex justify-center">
        <Link href="/list"
          className={`bg-gray text-yellow rounded-xl p-3 text-center mb-6 hover:bg-gray_2 hover:text-white`}>Add beer to Collection</Link>
      </div>

      <BeerList beers={collectionBeers.data} loading={collectionBeers.loading} showCollectionOnly={true} />
    </>
  )
}
