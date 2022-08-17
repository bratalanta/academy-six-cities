import { Link } from 'react-router-dom';
import { SkewLoader } from 'react-spinners';
import { AppRoute, Loader } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { authSelector, selectUserInfo } from '../../store/auth-slice/selectors';
import { selectFavorites } from '../../store/favorite-slice/selectors';
import styles from '../user-profile/user-profile.module.css';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const favoriteProperties = useAppSelector(selectFavorites);
  const {isLogoutStatusPending} = useAppSelector(authSelector);

  const handleSignOutClick = () => {
    if (isLogoutStatusPending) {
      return;
    }

    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"/>
            <span className="header__user-name user__name">
              {userInfo?.email}
            </span>
            {userInfo && <span className="header__favorite-count">{favoriteProperties.length}</span>}
          </Link>
        </li>
        <li className="header__nav-item">
          {
            userInfo ?
              <a
                className="header__nav-link"
                onClick={handleSignOutClick}
              >
                <span className={`header__signout ${styles.signOut}`}>
                  Sign out
                  {
                    <SkewLoader
                      size={Loader.Logout.size}
                      loading={isLogoutStatusPending}
                      color={Loader.Logout.color}
                      className={styles.loader}
                    />
                  }
                </span>
              </a>
              :
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
              >
                <span className="header__login">Sign in</span>
              </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
