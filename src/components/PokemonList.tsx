import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Pokemon } from "@/interfaces/PokemonResponse";

interface PokemonUIProps {
  pokemonList: Pokemon[];
}

export default function PokemonUI({ pokemonList }: PokemonUIProps) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {pokemonList.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPokemon(pokemon)}
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
                className="mx-auto"
              />
            </motion.div>
            <h2 className="text-xl font-semibold text-center mt-4">
              {pokemon.name}
            </h2>
            <p className="text-center text-sm text-gray-400">
              {pokemon.type} Type
            </p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedPokemon && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPokemon(null)}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </motion.div>
              <h2 className="text-2xl font-bold mt-4">
                {selectedPokemon.name}
              </h2>
              <p className="text-gray-400">Type: {selectedPokemon.type}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
