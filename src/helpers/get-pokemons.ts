import type { PokemonListResponse, SmallPokemon } from "~/interfaces";

export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}/`);
    const json = await response.json() as PokemonListResponse;
    return json.results.map(({url, name})=> {
        const segments = url.split('/');
        const id = segments.at(-2)!;
        return { id, name }
    });
}