import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';
import { getSmallPokemons } from '~/helpers/get-pokemons';

// interface PokemonState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }

export default component$(() => {

  // const pokemonState = useStore<PokemonState>({ currentPage: 0, pokemons: [], isLoading: false });

  const pokemonList = useContext(PokemonListContext)

  // Client

  // useVisibleTask$(async ({track}) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);
    
    const pokemons = await getSmallPokemons(pokemonList.currentPage * 10, 10);
    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];
    pokemonList.isLoading = false;
  });

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if ((currentScroll + 200) >= maxScroll && !pokemonList.isLoading) {
        pokemonList.isLoading = true;
        pokemonList.currentPage++;
      }

    })
  );

  return (
    <>
      <div class="flex flex-col items-center">
        <p class="my-5 text-xl">Estado</p>
        <p>Página actual: {pokemonList.currentPage}</p>
        <p>Está cargando: </p>

        <div class="mt-10">
          <button class="btn btn-primary mr-2" onClick$={() => pokemonList.currentPage--}>
            Anteriores
          </button>
          <button class="btn btn-primary mr-2" onClick$={() => pokemonList.currentPage++}>
            Siguientes
          </button>
        </div>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {
          pokemonList.pokemons.map((pokemon) => (
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
  title: 'Client',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],

};