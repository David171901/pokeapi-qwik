import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async ({query, redirect, pathname}) => {
  const offset = Number(query.get('offset') || '0');
  if(isNaN(offset)) redirect(301, pathname);
  if(offset < 0) redirect(301, pathname);
  const pokemons = await getSmallPokemons(offset)
  return pokemons;
})

export default component$(() => {
  const pokemonResponse = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  })

  return (
    <>
      <div class="flex flex-col items-center">
        <p class="my-5 text-xl">Estado</p>
        <p>Offset: {currentOffset}</p>
        <p>Está cargando página: {location.isNavigating ? 'Si' : 'No'}</p>
        
      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link  href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}  class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {
          pokemonResponse.value.map((pokemon) => (
            <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={pokemon.id}></PokemonImage>
              <span class="capitalize">{pokemon.name}</span>
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