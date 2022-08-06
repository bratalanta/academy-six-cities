import { Link } from 'react-router-dom';
import { SkewLoader } from 'react-spinners';
import { AppRoute, LoadingStatus, LOGOUT_LOADER_COLOR, LOGOUT_LOADER_SIZE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { selectLogoutStatus, selectUserInfo } from '../../store/auth-slice/selectors';
import { selectPropeties } from '../../store/properties-slice/selectors';
import styles from '../user-profile/user-profile.module.css';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const favoriteProperties = useAppSelector(selectPropeties)
    .filter(({isFavorite}) => isFavorite);
  const logoutStatus = useAppSelector(selectLogoutStatus);

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
                onClick={(evt) => {
                  evt.preventDefault();

                  if (logoutStatus === LoadingStatus.Pending) {
                    return;
                  }

                  dispatch(logoutAction());
                }}
              >
                <span className={`header__signout ${styles.signOut}`}>
                  Sign out
                  {
                    <SkewLoader
                      size={LOGOUT_LOADER_SIZE}
                      loading={logoutStatus === LoadingStatus.Pending}
                      color={LOGOUT_LOADER_COLOR}
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
