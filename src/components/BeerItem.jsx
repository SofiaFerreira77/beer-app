import { useBeerContext } from '../data/context/BeerContext';
import Link from "next/link";
import { IconStaredSolid, IconStared } from "./ui/Icons"
import Image from 'next/image';

export default function BeerItem(props) {
  const { toggleFavorite } = useBeerContext();
  const { beer } = props;

  return (
    <div className="relative" key={beer.id}>

      {!props.showCollectionOnly ?
        <button id={beer.id}
          onClick={() => toggleFavorite(beer.id, beer.isFavorite)}
          className={`absolute z-20 right-2 top-2 p-2 text-2xl bg-white_2 text-gray_2 rounded-full
                          transition-all hover:text-brown hover:bg-white`}>
          {beer.isFavorite ? IconStaredSolid : IconStared}
        </button>
        :
        <></>
      }

      <Link href={`/beer/${beer.id}`}
        className="block group h-[460px] w-100
              bg-brown_4 drop-shadow-lg rounded-xl
              relative z-0 top-0 mb-4
              transition-all hover:drop-shadow-2xl">
        <div className={`flex justify-center 
                            relative z-10
                            h-[340px] sm:h-[465px] p-3
                          bg-white rounded-xl overflow-hidden drop-shadow-lg
                          sm:transition-all sm:group-hover:h-[340px]`}>

          <Image
            src={beer.image_url}
            alt={beer.tagline}
            className="max-h-[100%]"
            width={455}
            height={330}
            priority
          />
        </div>

        <div className={`relative sm:absolute bottom-0 left-0 right-0 z-0 
                            flex justify-center items-center gap-2
                            p-2 h-28`}>
          <h3 className={`w-1/2 font-semibold text-md text-center text-white_2`}>{beer.name} - <span className='truncate'>{beer.abv} %</span></h3>
          <p className={`w-1/2 text-sm text-center`}>{beer.tagline}</p>
        </div>
      </Link>
    </div>
  )
}
