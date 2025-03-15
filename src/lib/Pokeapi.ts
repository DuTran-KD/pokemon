import axios from "axios";
import { cacheData, getCachedData } from "./Cache";
import { Pokemon } from "@/interfaces/Pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (nameOrId: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
};

export const getPokemonList = async (
  limit: number = 24,
  offset: number = 0
) => {
  console.log("limit: ", limit);
  try {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

export const getPokemonSpecies = async (nameOrId: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon-species/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon species data:", error);
    throw error;
  }
};

export const getPokemonTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/type`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw error;
  }
};

export const getPokemonByType = async (type: string) => {
  try {
    const response = await axios.get(`${API_URL}/type/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon by type:", error);
    throw error;
  }
};

export const filteredPokemon = async (
  types: string[],
  page = 1,
  limit = 24
) => {
  const response = await Promise.all(
    types.map(async (type) => {
      const data = await getPokemonByType(type);
      return data.pokemon.map((pokemon: { pokemon: { name: string } }) => {
        return pokemon.pokemon;
      });
    })
  );

  let pokemons: any[] = [];
  for (let item of response) {
    if (pokemons.length == 0) {
      pokemons = item;
      continue;
    }
    pokemons = pokemons.filter((cur) => item.find((el: Pokemon) => el.name == cur.name));
  }
  const next = pokemons.length > limit * page;
  const previous = page > 1;
  return {
    count: pokemons.length,
    next: next
      ? `/pokemon?page=${page}&limit=${limit}&type=${types.toString()}`
      : null,
    previous: previous
      ? `/pokemon?page=${page - 1}&limit=${limit}&type=${types.toString()}`
      : null,
    results: pokemons.slice((page - 1) * limit, page * limit),
  };
};
