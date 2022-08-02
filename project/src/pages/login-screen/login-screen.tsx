import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, useState } from 'react';
import cl from '../login-screen/login-screen.module.css';
import { FormState } from '../../types/login-form';

const RegExp: Record<string, RegExp> = {
  password: /[a-zA-Z]+[0-9]|[0-9]+[a-zA-z]/,
  email: /[^@]+@[^@]+\.[^@]/
};

const ErrorMessage: Record<string, string> = {
  password: 'Password must be at least 1 number and 1 letter.',
  email: 'Please enter a valid email address.'
};

export default function LoginScreen(): JSX.Element {
  const [values, setValues] = useState<FormState>({
    email: {
      value: '',
      dirty: false,
      errorMessage: ErrorMessage.email
    },
    password: {
      value: '',
      dirty: false,
      errorMessage: ErrorMessage.password
    },
  });
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const {email, password} = values;

  const passwordErrorText = password.dirty &&
  password.errorMessage &&
  <span className={cl.errorMessage}>{password.errorMessage}</span>;

  const emailErrorText = email.dirty &&
   email.errorMessage &&
    <span className={cl.errorMessage}>{email.errorMessage}</span>;

  const getErrorMessage = (value: string, name: string ) => {
    if (!value.match(RegExp[name])) {
      return ErrorMessage[name];
    }

    return '';
  };

  const onInputChange = (value: string, name: string) => {
    setValues({
      ...values, [name]: {
        ...values[name], errorMessage: getErrorMessage(value, name),
        value: value
      }
    });
  };

  useEffect(() => {
    if (!email.errorMessage && !password.errorMessage) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className={`login__input-wrapper form__input-wrapper ${cl.inputWrapper}`}>
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={email.value}
                  placeholder="Email"
                  onBlur={() => setValues({
                    ...values, email: {
                      ...email, dirty: true
                    }
                  })}
                  onChange={(evt) => onInputChange(evt.currentTarget.value, evt.currentTarget.name)}
                />
                {emailErrorText}
              </div>
              <div className={`login__input-wrapper form__input-wrapper ${cl.inputWrapper}`}>
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  value={password.value}
                  placeholder="Password"
                  onBlur={() => setValues({
                    ...values, password: {
                      ...password, dirty: true
                    }
                  })}
                  onInput={(evt) => onInputChange(evt.currentTarget.value, evt.currentTarget.name)}
                />
                {passwordErrorText}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isFormDisabled}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Paris</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
