import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import LoginForm from './login-form';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Auth]: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should dispatch loginAction', async () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/E-mail/i), 'test@test.ru');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), '1adadadw13q');
    await userEvent.click(screen.getByTestId('submit'));

    const actions = store.getActions();
    expect(actions[3].type).toBe('user/login/pending');
  });
});
