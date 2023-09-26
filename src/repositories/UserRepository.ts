export default class UserRepository {
  async getBeerCollection() {
    return JSON.parse(localStorage.getItem('collection'));
  }

  async addToCollection(collection) {
    localStorage.setItem('collection', JSON.stringify(collection));
  }

  async removeFromCollection(collection) {
    localStorage.setItem('collection', JSON.stringify(collection));
  }

  async updateBeerRating(ratedBeers) {
    localStorage.setItem('ratedBeers', JSON.stringify(ratedBeers));
  }
}