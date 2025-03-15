import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import HomePage from "@/views/HomePage";
import { GetServerSideProps, GetStaticProps } from "next";
import { filteredPokemon, getPokemonList } from "@/lib/Pokeapi";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { Params } from "next/dist/server/request/params";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Pokemon({
  pokemonResponse,
}: {
  pokemonResponse: PokemonResponse;
}) {
  console.log("pokemonResponse: ", pokemonResponse);
  return <HomePage pokemonResponse={pokemonResponse} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log("query: ", query);
  const { types } = query;
  const limit = 24;
  const page = query.page ? Number(query.page) : 1;
  const filterdTypes = types ? (types as string)?.split(",") : null;
  let pokemonResponse: PokemonResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  if (filterdTypes?.length) {
    console.log("filterdTypes: ", filterdTypes);
    pokemonResponse = await filteredPokemon(
      filterdTypes,
      page || 1,
      limit || 24
    );
  } else {
    pokemonResponse = await getPokemonList(limit, limit * (page - 1));
  }

  return {
    props: {
      pokemonResponse: pokemonResponse || [],
    },
    // revalidate: 1800, // Revalidate every 30 mins
  };
};
