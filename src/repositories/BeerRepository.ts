const BASE_URL = 'https://api.punkapi.com/v2';

interface Beer {
  id: number;
}

export default class BeerRepository {
  async getAllBeers(): Promise<Beer[]> {
    try {
      const response = await fetch(`${BASE_URL}/beers`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as Beer[];
    } catch (error) {
      console.error('Error fetching beers:', error);
      throw error;
    }
  }

  async getSomeBeers(quantity: number): Promise<Beer[]> {
    try {
      const response = await fetch(`${BASE_URL}/beers?per_page=${quantity}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as Beer[];
    } catch (error) {
      console.error('Error fetching beers:', error);
      throw error;
    }
  }

  async getBeerById(beerId: number): Promise<Beer> {
    try {
      const response = await fetch(`${BASE_URL}/beers/${beerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as Beer;
    } catch (error) {
      console.error(`Error fetching beer with ID ${beerId}:`, error);
      throw error;
    }
  }
}