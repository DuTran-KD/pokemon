import { getPokemonTypes } from "@/lib/Pokeapi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PokemonFilteringProps {
  onFilter: (filteredPokemons: string[]) => void;
  total: number;
}

const PokemonFiltering: React.FC<PokemonFilteringProps> = ({
  onFilter,
  total,
}) => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const router = useRouter();
  const fetchTypes = async () => {
    try {
      const response = await getPokemonTypes();
      setTypes(response.results.map((type: { name: string }) => type.name));
    } catch (error) {
      console.error("Error fetching Pokémon types:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
    const types = router.query.types;
    if (types) {
      setSelectedTypes((types as string).split(","));
    }
  }, []);

  const toggleTypeSelection = (type: string) => {
    const selected = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(selected);

    onFilter(selected);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-black">Total count: {total || 0}</h2>
      <div className="flex flex-row">
        <h2 className="text-black">Types:</h2>
        <div>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => toggleTypeSelection(type)}
              className={`${
                selectedTypes.includes(type)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } p-2 m-2 rounded border border-gray-300`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonFiltering;
