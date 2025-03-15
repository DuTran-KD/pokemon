import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonFiltering from "./PokemonFiltering";
import { Pokemon } from "@/interfaces/Pokemon";
import { Params } from "next/dist/server/request/params";

interface PokemonUIProps {
  pokemonResponse: PokemonResponse;
  pokemons: Pokemon[];
}

export default function PokemonUIDefault({
  pokemonResponse,
  pokemons,
}: PokemonUIProps) {
  const router = useRouter();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const handleFilter = (filteredPokemons: string[]) => {
    console.log("filteredPokemons: ", filteredPokemons);
    // if (filteredPokemons.length === 0) {
    //   router.push("/pokemon");
    //   return;
    // }
    setFilters(filteredPokemons);
    const config: any = {
      pathname: "/pokemon",
      query: { page: 1 },
    };

    if (filteredPokemons.length > 0) {
      config.query = { ...config.query, types: filteredPokemons.join(",") };
    }
    router.push(config);
  };

  const handleNextPage = () => {
    const { page = 1, types } = router.query;

    const config: any = {
      pathname: "/pokemon",
      query: { page: Number(page) + 1 },
    };

    if (types) {
      config.query = { ...config.query, types };
    }
    router.push(config);
  };

  const handlePreviousPage = () => {
    const { page = 1, types } = router.query;

    const config: any = {
      pathname: "/pokemon",
      query: { page: Number(page) - 1 },
    };

    if (types) {
      config.query = { ...config.query, types };
    }
    router.push(config);
  };

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <div className="min-h-screen bg-white text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pokémon
      </motion.h1>
      <motion.div>
        <PokemonFiltering
          total={pokemonResponse?.count}
          onFilter={handleFilter}
        />
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {filteredPokemons?.map((pokemon: Pokemon) => (
          <motion.div
            key={pokemon.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={150}
                height={150}
                style={{ objectFit: "contain", height: 50 }}
                className="mx-auto"
              />
            </motion.div>
            <h2 className="text-md capitalize font-semibold text-center mt-4 text-black">
              {pokemon.name}
            </h2>
            <p className="text-center text-sm text-gray-400">
              Number: {pokemon.id}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {filteredPokemons.length === 0 && (
        <div className="text-center text-black w-full my-8">
          <h2>No Pokémon found</h2>
        </div>
      )}

      <div className="flex justify-center my-4">
        {pokemonResponse?.previous && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
            onClick={() => {
              // Handle previous page logic here
              handlePreviousPage();
            }}
          >
            Previous
          </button>
        )}
        {pokemonResponse?.next && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              // Handle next page logic here
              handleNextPage();
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
