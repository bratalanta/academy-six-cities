import LoginForm from '../../components/login-form/login-form';
import Header from '../../components/header/header';
import RandomCityItem from '../../components/random-city-item/random-city-item';

export default function LoginScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <RandomCityItem />
        </div>
      </main>
    </div>
  );
}
