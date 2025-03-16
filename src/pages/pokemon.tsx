import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { filteredPokemon, getPokemonList } from "@/lib/Pokeapi";
import { POKEMON_API } from "@/utils/constant";
import HomePage from "@/views/HomePage";
import { GetServerSideProps } from "next";

interface PokemonPageProps {
  pokemonResponse: PokemonResponse;
}

export default function Pokemon({ pokemonResponse }: PokemonPageProps) {
  return <HomePage pokemonResponse={pokemonResponse} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { types, page: queryPage } = query;
  const limit = POKEMON_API.DEFAULT.LIMIT;
  const page = queryPage ? Number(queryPage) : POKEMON_API.DEFAULT.PAGE;
  const filterdTypes = types ? (types as string).split(",") : null;

  const pokemonResponse = filterdTypes?.length
    ? await filteredPokemon(filterdTypes, page, limit)
    : await getPokemonList(limit, limit * (page - 1));

  return {
    props: {
      pokemonResponse: pokemonResponse || [],
    },
  };
};