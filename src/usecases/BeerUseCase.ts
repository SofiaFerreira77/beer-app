import BeerRepository from "@/repositories/BeerRepository";
import UserRepository from "@/repositories/UserRepository";

type MashTemp = {
  temp: {
    value: number;
    unit: string;
  };
  duration: number;
};

type Malt = {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
};

type Hops = {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  add: string;
  attribute: string;
};

interface Beer {
  id: number;
  isFavorite?: boolean;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  method: {
    mash_temp: MashTemp[];
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist?: string;
  };
  ingredients: {
    malt: Malt[];
    hops: Hops[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

interface FilterOptions {
  type?: string;
  year?: number;
}

interface SortOptions {
  type: "abv" | "ibu" | "srm" | "ph";
}

class BeerUseCase {
    private beerRepository: BeerRepository;
    private userRepository: UserRepository;

  constructor(beerRepository, userRepository) {
    this.beerRepository = beerRepository;
    this.userRepository = userRepository;
  }

  async getAllBeers(filterBy?: FilterOptions, sortBy?: SortOptions): Promise<Beer[]> {
    const allBeers = await this.beerRepository.getAllBeers();
    const savedCollection = await this.userRepository.getBeerCollection();
    let filteredBeers: Beer[] = [];

    allBeers.forEach((beer) => {
      const isFavorite = savedCollection && savedCollection.includes(beer.id);
      beer.isFavorite = isFavorite;

      if (filterBy) {
        const condition =
          (filterBy.type && beer.type === filterBy.type) ||
          (filterBy.year && beer.year === filterBy.year);
        if (condition) filteredBeers.push(beer);
      } else {
        filteredBeers.push(beer);
      }
    });

    if (!sortBy) return filteredBeers;

    switch (sortBy.type) {
      case "abv":
        return filteredBeers.sort((a, b) => a.abv - b.abv);
      case "ibu":
        return filteredBeers.sort((a, b) => a.ibu - b.ibu);
      case "srm":
        return filteredBeers.sort((a, b) => a.srm - b.srm);
      case "ph":
        return filteredBeers.sort((a, b) => a.ph - b.ph);
      default:
        return filteredBeers;
    }
  }

  async getSomeBeers(quantity: number): Promise<Beer[]> {
    const getSomeBeers = await this.beerRepository.getSomeBeers(quantity);
    return getSomeBeers;
  }

  async getBeerCollection(): Promise<Beer[]> {
    const allBeers = await this.beerRepository.getAllBeers();
    const savedCollection = await this.userRepository.getBeerCollection();

    let filteredCollection: Beer[] = [];
    if (savedCollection) {
      filteredCollection = allBeers.filter((value) => savedCollection.includes(value.id));
    }
    return filteredCollection;
  }

  async getBeerById(beerId: number): Promise<Beer> {
    return this.beerRepository.getBeerById(beerId);
  }

  async addToCollection(beerId: number): Promise<void> {
    const savedCollection = await this.userRepository.getBeerCollection();
    const collection = savedCollection ? [...savedCollection, beerId] : [beerId];
    await this.userRepository.addToCollection(collection);
  }

  async removeFromCollection(beerId: number): Promise<void> {
    const savedCollection = await this.userRepository.getBeerCollection();
    if (savedCollection) {
      const filteredCollection = savedCollection.filter(item => item !== beerId);
      await this.userRepository.removeFromCollection(filteredCollection);
    }
  }

  async updateBeerRating(beerId: number, rating: number): Promise<void> {
    const ratedBeers = await this.userRepository.getRatedBeers();
    ratedBeers.push({ id: beerId, rating: rating });
    await this.userRepository.updateBeerRating(ratedBeers);
  }
}

export default BeerUseCase;