const BASE_URL = 'https://api.punkapi.com/v2';

export default class BeerRepository {
  async getAllBeers() {
    try {
      const response = await fetch(`${BASE_URL}/beers`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching beers:', error);
      throw error;
    }
  }

  async getBeerById(beerId) {
    try {
      const response = await fetch(`${BASE_URL}/beers/${beerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching beer with ID ${beerId}:`, error);
      throw error;
    }
  }
}