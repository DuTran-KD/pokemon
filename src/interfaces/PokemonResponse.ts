import { Pokemon } from "./Pokemon";

export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface HomePageProps {
    pokemonResponse: PokemonResponse;
}