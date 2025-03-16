import PokemonUIDefault from "@/components/PokemonDefault";
import { Pokemon } from "@/interfaces/Pokemon";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { useEffect, useState } from "react";

interface HomePageProps {
  pokemonResponse: PokemonResponse;
}

export default function HomePage({ pokemonResponse }: HomePageProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (pokemonResponse?.results) {
      // fetchImages(pokemonResponse?.results);
      setPokemons(pokemonResponse?.results);
    }
  }, [pokemonResponse]);

  return (
    <PokemonUIDefault pokemonResponse={pokemonResponse} pokemons={pokemons} />
  );
}
