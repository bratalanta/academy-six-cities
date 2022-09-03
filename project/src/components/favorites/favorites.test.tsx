import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { makeFakeProperty } from '../../mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import Favorites from './favorites';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFavorites = [makeFakeProperty(), makeFakeProperty()];

const store = mockStore({
  [NameSpace.Favorites]: {favorites: mockFavorites},
});

describe('Component: Favorites', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toEqual(mockFavorites.length);
  });
});
