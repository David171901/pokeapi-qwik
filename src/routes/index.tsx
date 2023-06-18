import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const nav = useNavigate()

  const pokemonId = useSignal<number>(1); // primitivos, booleans, string, numbers, 
  const showBackImage = useSignal<boolean>(false);
  const isPokemonVisible = useSignal<boolean>(true);

  const changePokemonId = $((value: number) => {
    if((pokemonId.value + value) <= 0) return;
    pokemonId.value += value;
  })

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonId.value}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={() => goToPokemon()} class="cursor-pointer">
        <PokemonImage id={pokemonId.value} size={250} backImage={showBackImage.value} isVisible={isPokemonVisible.value}></PokemonImage>
      </div>
      {/* </Link> */}

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
};