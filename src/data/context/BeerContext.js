"use client"

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  
  const toggleFavorite = useCallback(
    async (beerId, isFavorite) => {
      try {
        if (isFavorite) {
          await useCase.removeFromCollection(beerId);
        } else {
          await useCase.addToCollection(beerId);
        }

        const updatedCollectionData = isFavorite
          ? collectionBeers.data.filter((item) => item !== beerId)
          : [...collectionBeers.data, beerId];
  
        setCollectionBeers({
          data: updatedCollectionData,
          loading: false,
        });
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },
    [collectionBeers.data, useCase]
  );
  
/*   useEffect(() => {
  }, [beerId, toggleFavorite]); */
  


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
        setAllBeers((prevAllBeers) => ({
          ...prevAllBeers,
          data: allBeersData,
          loading: false
        }));
      } catch (error) {
        console.error('All Beers - Error fetching beers:', error);
        setAllBeers((prevAllBeers) => ({
          ...prevAllBeers,
          loading: false
        }));
      }
    }

    fetchData();
  }, [filters, orderBy, useCase]);


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