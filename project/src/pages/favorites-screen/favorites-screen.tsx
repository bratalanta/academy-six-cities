import Favorites from '../../components/favorites/favorites';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import NoFavorites from '../../components/no-favorites/no-favorites';
import { useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/favorite-slice/selectors';

export default function FavoritesScreen(): JSX.Element {
  const favoriteProperties = useAppSelector(selectFavorites);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoriteProperties.length ?
              <Favorites /> :
              <NoFavorites />
          }
        </div>
      </main>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}
