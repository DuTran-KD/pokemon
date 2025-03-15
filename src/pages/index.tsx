import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import HomePage from "@/views/HomePage";
import { GetServerSideProps, GetStaticProps } from "next";
import { getPokemonList } from "@/lib/Pokeapi";
import { PokemonResponse } from "@/interfaces/PokemonResponse";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({
  pokemonResponse,
}: {
  pokemonResponse: PokemonResponse;
}) {
  return <HomePage pokemonResponse={pokemonResponse} />;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...abc
}) => {
  console.log("abc: ", abc);
  console.log("params: ", params);
  console.log("type: ", params?.types);
  // console.log("arg: ", arg);
  const pokemonResponse = await getPokemonList();
  return {
    props: {
      pokemonResponse: pokemonResponse || [],
    },
    // revalidate: 1800, // Revalidate every 30 mins
  };
};
