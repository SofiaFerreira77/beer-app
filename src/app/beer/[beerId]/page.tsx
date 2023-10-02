import { Metadata } from "next";
import Link from "next/link";
import BeerUseCase from "@/usecases/BeerUseCase";
import BeerRepository from "@/repositories/BeerRepository"
import BeerDetail from "@/components/BeerDetail";
import { Preloader } from "@/components/ui/Preloader";
import { IconLeft, IconRight } from "@/components/ui/Icons";

type BeerProps = {
  params: {
    beerId: number
  }
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const beerRepository = new BeerRepository();
  const useCase = new BeerUseCase(beerRepository);
  const beer = await useCase.getBeerById(2);

  return beer
}

export async function generateMetadata({
  params,
}: BeerProps): Promise<Metadata> {
  const { beerId } = params;
  
  const beerRepository = new BeerRepository();
  const useCase = new BeerUseCase(beerRepository);
  const beer = await useCase.getBeerById(beerId);

  if (!beer)
    return {
      title: "Beer Not Found",
    };

  return {
    title: beer.name,
    description: beer.description,
  };
}

export default async function Beer({ params }: BeerProps) {
  const { beerId } = params;
  const beerRepository = new BeerRepository();
  const useCase = new BeerUseCase(beerRepository);
  const beer = await useCase.getBeerById(beerId);

  return (
    <>
      <div className="container mx-auto relative flex justify-start items-start gap-3 text-xs my-5">
        { beer ?
          <BeerDetail bottle={beer[0]} />
          :
          <Preloader />
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
    </>
  );
}