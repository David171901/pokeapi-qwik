import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/qwik';
import styles from './navbar.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/">
            <QwikLogo height={50} width={143} />
          </Link>
        </div>
        <ul>
          <li>
            <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank">
              Tutorials
            </a>
          </li>
          <li>
            <Link href='/pokemons/list-ssr/'>
              SSR-List
            </Link>
          </li>
          <li>
            <Link href='/pokemons/list-client/'>
              Client-List
            </Link>
          </li>
          <li>
            <Link href='/login/'>
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
