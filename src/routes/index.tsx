import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate()

  const pokemonGame = useContext(PokemonGameContext)

  // const pokemonId = useSignal<number>(1); // primitivos, booleans, string, numbers, 
  // const showBackImage = useSignal<boolean>(false);
  // const isPokemonVisible = useSignal<boolean>(true);

  const changePokemonId = $((value: number) => {
    if((pokemonGame.pokemonId + value) <= 0) return;
    pokemonGame.pokemonId += value;
  })

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonGame.pokemonId}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      <div>PUBLIC_API_URL: {import.meta.env.PUBLIC_GTM}</div>
      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={() => goToPokemon()} class="cursor-pointer">
        <PokemonImage id={pokemonGame.pokemonId} size={250} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible}></PokemonImage>
      </div>
      {/* </Link> */}

      <div>
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(1)} class="btn btn-primary mr-2">Siguientes</button>
        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = true} class="btn btn-primary mr-2">Mostrar</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = false} class="btn btn-primary mr-2">Ocultar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
};