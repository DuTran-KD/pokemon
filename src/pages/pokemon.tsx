import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { filteredPokemon, getPokemonList } from "@/lib/Pokeapi";
import { POKEMON_API } from "@/utils/constant";
import HomePage from "@/views/HomePage";
import { GetServerSideProps } from "next";


export default function Pokemon({
  pokemonResponse,
}: {
  pokemonResponse: PokemonResponse;
}) {
  console.log("pokemonResponse: ", pokemonResponse);
  return <HomePage pokemonResponse={pokemonResponse} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { types } = query;
  const limit = POKEMON_API.DEFAULT.LIMIT;
  const page = query.page ? Number(query.page) : POKEMON_API.DEFAULT.PAGE;
  const filterdTypes = types ? (types as string)?.split(",") : null;

  let pokemonResponse: PokemonResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  if (filterdTypes?.length) {
    pokemonResponse = await filteredPokemon(filterdTypes, page, limit);
  } else {
    pokemonResponse = await getPokemonList(limit, limit * (page - 1));
  }

  return {
    props: {
      pokemonResponse: pokemonResponse || [],
    },
  };
};
