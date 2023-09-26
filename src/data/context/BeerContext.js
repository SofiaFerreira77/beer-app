"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import BeerUseCase from "../../usecases/BeerUseCase";
import BeerRepository from "../../repositories/BeerRepository"
import UserRepository from "../../repositories/UserRepository"

const BeerContext = createContext();

export function useBeerContext() {
  return useContext(BeerContext);
}

export function BeerProvider({ children }) {
  const userRepository = new UserRepository();
  const beerRepository = new BeerRepository();
  const useCase = new BeerUseCase(beerRepository, userRepository);

  const [allBeers, setAllBeers] = useState({ data: [], loading: true });
  const [collectionBeers, setCollectionBeers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [orderBy, setOrderBy] = useState({ type: 'abv' });


  const toggleFavorite = async (beerId, isFavorite) => {
    if (isFavorite) {
      try {
        await useCase.removeFromCollection(beerId);
        collectionBeers.data.filter((item) => item !== beerId);
        isFavorite = false;
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    } else {
      try {
        await useCase.addToCollection(beerId);
        collectionBeers.data.push(beerId);
        isFavorite = true;
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  const value = {
    allBeers,
    setAllBeers,
    collectionBeers,
    setCollectionBeers,
    filters,
    setFilters,
    orderBy,
    setOrderBy,
    toggleFavorite
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const allBeersData = await useCase.getAllBeers(filters, orderBy);
        setAllBeers({
          data: allBeersData,
          loading: false
        })
      } catch (error) {
        console.error('All Beers - Error fetching beers:', error);
        allBeers.loading = false
      }
    }

    fetchData();
  }, [allBeers, filters, orderBy]);


  useEffect(() => {
    async function fetchData() {
      const collectionData = await useCase.getBeerCollection();

      try {
        setCollectionBeers({
          data: collectionData,
          loading: false
        })
      } catch (error) {
        console.error('Beers Collection - Error fetching beers:', error);
        collectionBeers.loading = false;
      }
    }

    fetchData();
  }, [collectionBeers, useCase, toggleFavorite])

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
}