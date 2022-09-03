import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { CardClassName } from '../../const';
import userEvent from '@testing-library/user-event';
import PropertyList from './property-list';
import { makeFakeProperty } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import ActiveCardProvider from '../../contexts/active-card-provider/active-card-provider';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockProperties = [makeFakeProperty(), makeFakeProperty()];
const store = mockStore();

describe('Component: PropertyList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActiveCardProvider>
            <PropertyList properties={mockProperties} cardClassName={CardClassName.Cities} />
          </ActiveCardProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('article').length).toEqual(mockProperties.length);
    expect(screen.getByText(mockProperties[0].title)).toBeInTheDocument();
  });

  it('should change favorite status when user clicks on favorite button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PropertyList properties={mockProperties} cardClassName={CardClassName.Cities} />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByTestId('change-button')[0]);

    const [action] = store.getActions();

    expect(action.type).toBe('favorite/changeFavoriteStatus/pending');
  });
});
