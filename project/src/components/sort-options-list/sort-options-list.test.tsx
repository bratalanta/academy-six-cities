import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { DEFAULT_CITY, NameSpace, SortOption } from '../../const';
import userEvent from '@testing-library/user-event';
import SortOptionsList from './sort-options-list';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  }
});

const mockSortOption = jest.fn();

describe('Component: SortOptionsList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <SortOptionsList currentCity={DEFAULT_CITY} activeSortOption={SortOption.POPULAR} />
      </Provider>
    );

    expect(screen.getByTestId('sort-form')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(Object.values(SortOption).length);
  });

  it('should change current sort option when user clicks on else sort option', async () => {
    render(
      <Provider store={store}>
        <SortOptionsList currentCity={DEFAULT_CITY} activeSortOption={SortOption.POPULAR} />
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('listitem')[1]);

    mockSortOption(SortOption.HIGH_TO_LOW);
    expect(mockSortOption).toBeCalled();

    const [action] = store.getActions();
    expect(action.type).toBe('app/setCurrentSortOption');
  });
});
