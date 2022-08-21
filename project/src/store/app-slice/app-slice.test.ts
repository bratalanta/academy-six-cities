import { DEFAULT_CITY, SortOption } from '../../const';
import { makeFakeCity } from '../../mocks';
import { appSlice, setCurrentCity, setCurrentSortOption } from './app-slice';

const mockCity = makeFakeCity();

describe('Reducer: appSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(appSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        {
          currentCity: DEFAULT_CITY,
          currentSortOption: SortOption.POPULAR
        });
  });

  it('should change current city', () => {
    const state = {
      currentCity: DEFAULT_CITY,
      currentSortOption: SortOption.POPULAR
    };

    expect(appSlice.reducer(state, setCurrentCity(mockCity)))
      .toEqual({currentCity: mockCity, currentSortOption: SortOption.POPULAR});
  });

  it('should change current sort option to "TOP_RATED"', () => {
    const state = {
      currentCity: DEFAULT_CITY,
      currentSortOption: SortOption.POPULAR
    };

    expect(appSlice.reducer(state, setCurrentSortOption(SortOption.TOP_RATED)))
      .toEqual({
        currentCity: DEFAULT_CITY,
        currentSortOption: SortOption.TOP_RATED
      });
  });
});
