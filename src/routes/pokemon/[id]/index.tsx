import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$(({params, redirect}) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, '/');
  if (id <= 0) redirect(301, '/');
  if (id > 1000) redirect(301, '/');
  return id;
})

export default component$(() => {

  // const location = useLocation();
  const pokemonId = usePokemonId();

  const pokemonGame = useContext(PokemonGameContext)

  return (
    <div>
      <p>Pokemon: {pokemonId}</p>
      <PokemonImage id={pokemonGame.pokemonId} size={250} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible}></PokemonImage>
    </div>
  )
});