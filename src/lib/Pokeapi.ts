import { Pokemon } from "@/interfaces/Pokemon";
import { POKEMON_API } from "@/utils/constant";
import axios from "axios";

const API_URL = POKEMON_API.URL;

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
  limit: number = POKEMON_API.DEFAULT.LIMIT,
  offset: number = POKEMON_API.DEFAULT.OFFSET
) => {
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
  page = POKEMON_API.DEFAULT.PAGE,
  limit = POKEMON_API.DEFAULT.LIMIT
) => {
  const response = await Promise.all(
    types.map(async (type) => {
      const data = await getPokemonByType(type);
      return data.pokemon.map((pokemon: { pokemon: { name: string } }) => {
        return pokemon.pokemon;
      });
    })
  );

  let pokemons: Pokemon[] = [];
  for (const item of response) {
    if (pokemons.length == 0) {
      pokemons = item;
      continue;
    }
    pokemons = pokemons.filter((cur) =>
      item.find((el: Pokemon) => el.name == cur.name)
    );
  }

  const next = pokemons.length > limit * page ? 'ok' : null;
  const previous = page > 1 ? 'ok' : null;
  
  return {
    count: pokemons.length,
    next: next,
    previous: previous,
    results: pokemons.slice((page - 1) * limit, page * limit),
  };
};
export const fetchImages = async (pokemons: Pokemon[]) => {
  const updatedPokemons = await Promise.all(
    pokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();

      return {
        ...pokemon,
        image:
          data.sprites.other?.showdown?.front_default ||
          data.sprites.front_default,
        id: data.id,
      };
    })
  );

  return updatedPokemons;
};