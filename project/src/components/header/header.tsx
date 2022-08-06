import Logo from '../logo/logo';
import UserProfile from '../user-profile/user-profile';

type HeaderProps = {
  isLoginPage?: boolean
}

export default function Header({isLoginPage}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          {!isLoginPage && <UserProfile />}
        </div>
      </div>
    </header>
  );
}
