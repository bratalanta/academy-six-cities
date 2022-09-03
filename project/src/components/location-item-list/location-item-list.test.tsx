import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { CITIES, DEFAULT_CITY, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import LocationItemList from './location-item-list';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY
  }
});

const mockCurrentCity = jest.fn();

describe('Component: LocationItemList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <LocationItemList />
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(CITIES.length);
  });

  it('should change current city and properties when user clicks on LocationItem', async () => {
    render(
      <Provider store={store}>
        <LocationItemList />
      </Provider>
    );

    await userEvent.click(screen.getAllByTestId('location-link')[1]);

    mockCurrentCity('Amsterdam');
    expect(mockCurrentCity).toBeCalled();

    const [action] = store.getActions();
    expect(action.type).toBe('app/setCurrentCity');
  });
});
