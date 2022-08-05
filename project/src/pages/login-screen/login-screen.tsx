import LoginForm from '../../components/login-form/login-form';
import Header from '../../components/header/header';

export default function LoginScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>
      <LoginForm />
    </div>
  );
}
