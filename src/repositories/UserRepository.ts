interface Beer {
  id: number
}

export default class UserRepository {
  async getBeerCollection(): Promise<Beer[] | null> {
    const collectionString = localStorage.getItem('collection');
    if (collectionString) {
      return JSON.parse(collectionString) as Beer[];
    }
    return null;
  }

  async addToCollection(collection: Beer[]): Promise<void> {
    localStorage.setItem('collection', JSON.stringify(collection));
  }

  async removeFromCollection(collection: Beer[]): Promise<void> {
    localStorage.setItem('collection', JSON.stringify(collection));
  }

  async updateBeerRating(ratedBeers: Beer[]): Promise<void> {
    localStorage.setItem('ratedBeers', JSON.stringify(ratedBeers));
  }
}