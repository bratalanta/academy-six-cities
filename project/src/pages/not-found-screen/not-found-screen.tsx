import styles from '../not-found-screen/not-found-screen.module.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.text}>Oopsie! Page is not found</p>
        <Link
          className={styles.home}
          to={AppRoute.Main}
          data-testid="not-found-link"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}
