import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal<number>(1); // primitivos, booleans, string, numbers, 
  const showBackImage = useSignal<boolean>(false);
  const isPokemonVisible = useSignal<boolean>(true);

  const changePokemonId = $((value: number) => {
    if((pokemonId.value + value) <= 0) return;
    pokemonId.value += value;
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <PokemonImage id={pokemonId.value} size={250} backImage={showBackImage.value} isVisible={isPokemonVisible.value}></PokemonImage>

      <div>
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(1)} class="btn btn-primary mr-2">Siguientes</button>
        <button onClick$={() => showBackImage.value = !showBackImage.value} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => isPokemonVisible.value = true} class="btn btn-primary mr-2">Mostrar</button>
        <button onClick$={() => isPokemonVisible.value = false} class="btn btn-primary mr-2">Ocultar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],

};
