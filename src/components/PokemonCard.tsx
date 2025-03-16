import { Pokemon } from "@/interfaces/Pokemon";
import fetcher from "@/lib/Fetcher";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(pokemon.image);
  const { data, error } = useSWR(pokemon.url, fetcher);

  useEffect(() => {
    setImgSrc(data?.sprites.other?.["official-artwork"].front_default);
  }, [data]);

  return (
    <motion.div
      key={pokemon.id}
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error && <p className="text-red-500">Failed to load</p>}
      {loading && <p className="text-gray-400">Loading...</p>}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imgSrc}
          alt={pokemon.name}
          width={150}
          height={150}
          style={{ objectFit: "contain", height: 50 }}
          className={`mx-auto`}
          onLoadingComplete={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
            setImgSrc("/pokemonball.webp");
          }}
        />
      </motion.div>
      <h2 className="text-md capitalize font-semibold text-center mt-4 text-black">
        {pokemon.name}
      </h2>
      <p className="text-center text-sm text-gray-400">Number: {pokemon.id}</p>
    </motion.div>
  );
}
