"use client"

import { useBeerContext } from '@/data/context/BeerContext'
import Link from 'next/link'
import BeerList from '@/components/BeerList'
import Heading from '@/components/ui/Heading'
import BeerRefinements from '@/components/BeerRefinements'
import { IconLeft } from '@/components/ui/Icons'

export default function Home() {
  const { allBeers } = useBeerContext();

  return (
    <>
      <Heading title="All Beers"
        subtitle="Your Beer Journey Begins Here!" />

      <Link href="/"
        className={`w-fit mx-auto flex align-center justify-center bg-gray text-yellow rounded-xl p-3 text-center 
                mb-10 hover:bg-gray_2 hover:text-white gap-3`}>
        {IconLeft}
        Back to Collection
      </Link>

      <BeerRefinements />

      <BeerList beers={allBeers.data} loading={allBeers.loading} showCollectionOnly={false} />
    </>
  )
}
