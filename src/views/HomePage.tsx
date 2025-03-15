import PokemonUIDefault from "@/components/PokemonDefault";
import { Pokemon } from "@/interfaces/Pokemon";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { getPokemonList } from "@/lib/Pokeapi";
import { Params } from "next/dist/server/request/params";
import { useEffect, useState } from "react";

interface HomePageProps {
  pokemonResponse: PokemonResponse;
}

export default function HomePage({ pokemonResponse }: HomePageProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchImages = async (pokemons: Pokemon[]) => {
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

    pokemonResponse.results = updatedPokemons;
    setPokemons(updatedPokemons);
  };

  useEffect(() => {
    if (pokemonResponse?.results) {
      fetchImages(pokemonResponse?.results);
    }
  }, [pokemonResponse]);

  return (
    <PokemonUIDefault pokemonResponse={pokemonResponse} pokemons={pokemons} />
  );
}
