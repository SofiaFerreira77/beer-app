"use client"

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import Link from "next/link";

import BeerUseCase from "@/usecases/BeerUseCase";
import BeerRepository from "@/repositories/BeerRepository"
import BeerDetail from "@/components/BeerDetail";
import { Preloader } from "@/components/ui/Preloader";
import Heading from "@/components/ui/Heading";
import BeerList from "@/components/BeerList";
import { IconLeft, IconRight } from "@/components/ui/Icons";

export default function Detail() {
  const params = useParams()
  const { beerId } = params;

  const [response, setResponse] = useState({
    data: null,
    loading: true
  })

  const details = response.data;

  useEffect(() => {
    async function fetchData() {
      const beerRepository = new BeerRepository();
      const useCase = new BeerUseCase(beerRepository);
      const data = await useCase.getBeerById(beerId);

      try {
        setResponse({
          data: data,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching beers:', error);
        setResponse({ loading: false })
      }
    }

    fetchData();
  }, [beerId]);


  return (
    <>
      <div className="container mx-auto relative flex justify-start items-start gap-3 text-xs my-5">
        {!response.loading ? 
            details.map((bottleDetail, index) => <BeerDetail key={index} bottle={bottleDetail} />)
            :
            <Preloader/>
        }
      </div>

      <div className="container mx-auto flex justify-between gap-5 py-10 px-6 mb-14">
        <Link href="/"
          className={`flex gap-2 p-3 text-center text-sm bg-gray_2 text-gray
                    hover:bg-gray hover:text-white rounded-xl`}>{IconLeft} Back to Collection</Link>

        <Link href="/list"
          className={`flex gap-2 p-3 text-center text-sm bg-gray_2 text-gray
          hover:bg-gray hover:text-white rounded-xl`}>Show All {IconRight}</Link>
      </div>

      {/* <Heading title="Other beers" />
      <BeerList beers={allBeers.data} loading={allBeers.loading} showCollectionOnly={false} /> */}
    </>
  )
}
