import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { FormState } from '../../types/login-form';
import cl from '../login-form/login-form.module.css';
import 'react-toastify/dist/ReactToastify.css';

const RegExp: Record<string, RegExp> = {
  password: /[a-zA-Z]+[0-9]|[0-9]+[a-zA-z]/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

const ErrorMessage: Record<string, string> = {
  password: 'Password must be at least 1 number and 1 letter.',
  email: 'Please enter a valid email address.'
};

export default function LoginForm() {
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
  const dispatch = useAppDispatch();

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

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({email: email.value, password: password.value}));
  };

  useEffect(() => {
    if (!email.errorMessage && !password.errorMessage) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
  }, [email, password]);

  return (
    <>
      <ToastContainer />
      <form className="login__form form" onSubmit={(evt) => onFormSubmit(evt)}>
        <div className={`login__input-wrapper form__input-wrapper ${cl.inputWrapper}`}>
          <label className="visually-hidden">E-mail</label>
          <input
            className={`login__input form__input ${emailErrorText && cl.invalidInput}`}
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
            className={`login__input form__input ${passwordErrorText && cl.invalidInput}`}
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
    </>
  );
}
