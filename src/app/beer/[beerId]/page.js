"use client"

import { useParams, usePathname } from 'next/navigation'

import BeerUseCase from "@/usecases/BeerUseCase";
import BeerRepository from "@/repositories/BeerRepository"

import { useState, useEffect } from "react";
import Link from "next/link";
import BeerDetail from "@/components/BeerDetail";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  const params = useParams()
  const { beerId } = params; 

  const [response, setResponse] = useState({
    data: null,
    loading: true
  })

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

  function showDetail(details) {
    return details.map((bottleDetail, index) => <BeerDetail key={index} bottle={bottleDetail} />)
  }

  return (
    <>
      <div className="container mx-auto relative flex justify-start items-start gap-3 text-xs my-5">
        {!response.loading ? showDetail(response.data) : Preloader}
      </div>

      <div className="container mx-auto flex justify-between gap-5 py-10 px-6">
        <Link href="/"
          className={`bg-gray_2 text-gray rounded-xl p-3 text-center hover:bg-gray hover:text-white`}>Back to Collection</Link>

        <Link href="/list"
          className={`bg-gray text-yellow rounded-xl p-3 text-center hover:bg-gray_2 hover:text-white`}>Show All</Link>
      </div>
    </>
  )
}
