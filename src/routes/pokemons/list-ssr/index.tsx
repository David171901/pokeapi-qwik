import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import  type { BasicPokemonInfo, PokemonListResponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>( async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0/');
  const json = await response.json() as PokemonListResponse;
  return json.results;
})

export default component$(() => {

  const pokemonResponse = usePokemonList();

  return (
    <>
      <div class="flex flex-col items-center">
        <p class="my-5 text-xl">Estado</p>
        <p>Página actual: 0</p>
        <p>Está cargando página: ☻</p>
        
      <div class="mt-10">
        <Link class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {
          pokemonResponse.value.map((pokemon,index) => (
            <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize">{pokemon.name}</span>
              <PokemonImage id={index + 1}></PokemonImage>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'SSR',
};