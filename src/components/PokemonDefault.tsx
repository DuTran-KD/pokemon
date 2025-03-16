import { Pokemon } from "@/interfaces/Pokemon";
import { PokemonResponse } from "@/interfaces/PokemonResponse";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonFiltering from "./PokemonFiltering";

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

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const handleFilter = (filteredPokemons: string[]) => {
    const config: Parameters<typeof router.push>[0] = {
      pathname: "/pokemon",
      query: { page: 1 },
    };

    if (filteredPokemons.length > 0) {
      config.query = { ...config.query as object, types: filteredPokemons.join(",") };
    }
    router.push(config);
  };

  const handlePageChange = (increment: number) => {
    const { page = 1, types } = router.query;
    const config: Parameters<typeof router.push>[0] = {
      pathname: "/pokemon",
      query: { page: Number(page) + increment },
    };

    if (types) {
      config.query = { ...config.query as object, types };
    }
    router.push(config);
  };

  return (
    <div className="min-h-screen bg-white text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Pokemon world
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
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
            onClick={() => handlePageChange(-1)}
          >
            Previous
          </button>
        )}
        {pokemonResponse?.next && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
