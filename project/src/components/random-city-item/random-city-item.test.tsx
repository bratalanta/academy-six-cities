import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppRoute, DEFAULT_CITY, NameSpace, SortOption } from '../../const';
import userEvent from '@testing-library/user-event';
import RandomCityItem from './random-city-item';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  }
});

describe('Component: SortOptionsList', () => {

  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: AppRoute.Login }]}
          initialIndex={0}
        >
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<RandomCityItem />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to MainScreen when user clicks on random city', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: AppRoute.Login }]}
          initialIndex={0}
        >
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<RandomCityItem />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Mock MainScreen</h1>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Mock MainScreen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Mock MainScreen/i)).toBeInTheDocument();
  });
});
