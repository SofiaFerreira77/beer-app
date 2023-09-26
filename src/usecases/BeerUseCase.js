class BeerUseCase {
  constructor(beerRepository, userRepository) {
    this.beerRepository = beerRepository;
    this.userRepository = userRepository;
  }

  async getAllBeers(filterBy, sortBy) {
    const allBeers = await this.beerRepository.getAllBeers();
    const savedCollection = await this.userRepository.getBeerCollection();
    let filteredBeers = [];

    allBeers.forEach(beer => {
      const isFavorite = savedCollection.includes(beer.id);
      beer.isFavorite = isFavorite;

      if (filterBy) {
        const condition = (filterBy.type && beer.type == filterBy.type) || (filterBy.year && beer.type == filterBy.year);
        if (condition) filteredBeers.push(beer);
      } else {
        filteredBeers.push(beer);
      }
    })

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
        break;
    }

    return filteredBeers;
  }

  async getBeerCollection() {
    const allBeers = await this.beerRepository.getAllBeers();
    const savedCollection = await this.userRepository.getBeerCollection();
    let filteredCollection;

    if (savedCollection) {
      filteredCollection = allBeers.filter((value) => savedCollection.includes(value.id));
    }

    return filteredCollection;
  }

  async getBeerById(beerId) {
    return this.beerRepository.getBeerById(beerId);
  }

  async addToCollection(beerId) {
    let collection = JSON.parse(localStorage.getItem('collection'));
    collection.push(beerId);
    this.userRepository.addToCollection(collection);
  }

  async removeFromCollection(beerId) {
    let collection = Object.values(JSON.parse(localStorage.getItem('collection')));
    let filteredCollection = collection.filter((item) => item !== beerId);
    this.userRepository.removeFromCollection(filteredCollection);
  }

  async updateBeerRating(beer, rating) {
    let ratedBeers = JSON.parse(localStorage.getItem('ratedBeers'));
    ratedBeers.push({ id: beerId, rating: rating});
    this.userRepository.updateBeerRating(ratedBeers);
  }
}

export default BeerUseCase
