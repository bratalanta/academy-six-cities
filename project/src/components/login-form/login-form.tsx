import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import styles from '../login-form/login-form.module.css';
import cn from 'classnames';

const InputFields = {
  email: 'E-mail',
  password: 'Password'
} as const;

type InputName = {
  value: string;
  touched: boolean;
  errorMessage: string;
  isInputValid: boolean;
}

type FormState = {
  [index: string]: InputName
}

const RegExp: Record<string, RegExp> = {
  password: /[a-zA-Z]+[0-9]|[0-9]+[a-zA-z]/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
} as const;

const ErrorMessage: Record<string, string> = {
  password: 'Password must be at least 1 number and 1 letter.',
  email: 'Please enter a valid email address.'
} as const;

export default function LoginForm() {
  const [values, setValues] = useState<FormState>(() => (
    Object.keys(InputFields).reduce<FormState>((acc, name) => {
      acc[name] = {
        value: '',
        touched: false,
        errorMessage: ErrorMessage[name],
        isInputValid: false
      };

      return acc;
    }, {})));

  const dispatch = useAppDispatch();
  const [isSubmitButtonPressed, setIsSubmitButtonPressed] = useState(false);

  const {email, password} = values;

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;
    const isInputValid = RegExp[name].test(value);

    setValues({
      ...values,
      [name]: {
        ...values[name],
        isInputValid,
        value
      }
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!email.isInputValid || !password.isInputValid) {
      return;
    }

    dispatch(loginAction({
      email: email.value,
      password: password.value
    }));
  };

  const handleBlur = (name: string) => setValues({
    ...values,
    [name]: {
      ...values[name],
      touched: true
    }
  });

  const handleButtonClick = () => {
    email.touched = true;
    password.touched = true;
    setIsSubmitButtonPressed(true);
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" onSubmit={handleSubmit} noValidate>
        {
          Object.entries(InputFields).map(([name, label]) => {
            const inputWrapperCn = cn(
              'login__input-wrapper',
              'form__input-wrapper',
              styles.inputWrapper
            );
            const inputCn = cn(
              'login__input',
              'form__input',
              (!values[name].isInputValid && values[name].touched && isSubmitButtonPressed)
              && styles.invalidInput
            );

            return (
              <div
                className={inputWrapperCn}
                key={name}
              >
                <label className="visually-hidden">{label}</label>
                <input
                  className={inputCn}
                  type={name}
                  name={name}
                  value={values[name].value}
                  placeholder={label}
                  onBlur={() => handleBlur(name)}
                  onChange={handleChange}
                />
                {
                  !values[name].isInputValid &&
                  values[name].touched &&
                  isSubmitButtonPressed &&
                  <span className={styles.errorMessage}>{values[name].errorMessage}</span>
                }
              </div>
            );
          })
        }
        <button
          className="login__submit form__submit button"
          type="submit"
          onClick={() => {
            if (!isSubmitButtonPressed) {
              handleButtonClick();
            }
          }}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
