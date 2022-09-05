import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';
import NotFoundScreen from './not-found-screen';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Oopsie! Page is not found')).toBeInTheDocument();
  });

  it('should redirect to MainScreen when user clicks on "back to home page" button', async () => {
    history.push('/*');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/*'}
              element={<NotFoundScreen />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Mock MainScreen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Mock MainScreen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('not-found-link'));

    expect(screen.getByText(/Mock MainScreen/i)).toBeInTheDocument();
  });
});
