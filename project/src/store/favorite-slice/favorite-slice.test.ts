import { makeFakeProperty } from '../../mocks';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';
import { favoritesSlice, FavoritesSlice } from './favorite-slice';

const TEST_FAVORITES_COUNT = 10;

const mockFavorites = new Array(TEST_FAVORITES_COUNT).fill(null)
  .map(() => makeFakeProperty());
const mockFavoriteProperty = {...makeFakeProperty(), isFavorite: true};
const mockUnfavoriteProperty = {...makeFakeProperty(), isFavorite: false};

describe('Reducer: authSlice', () => {
  let state: FavoritesSlice;

  beforeEach(() => {
    state = {
      favorites: []
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(favoritesSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchFavoritesAction test', () => {
    it('should set favorites with given favorite properties if fetchFavoritesAction is fulfilled',
      () => {
        expect(favoritesSlice.reducer(state, {payload: mockFavorites, type: fetchFavoritesAction.fulfilled.type}))
          .toEqual({favorites: mockFavorites});
      });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should push given property to favorites if changeFavoriteStatusAction is fulfilled and isFavorite flag of given property is "true"',
      () => {
        expect(favoritesSlice.reducer(state, {payload: mockFavoriteProperty, type: changeFavoriteStatusAction.fulfilled.type}))
          .toEqual({favorites: [...state.favorites, mockFavoriteProperty]});
      });

    it('should delete favorite property from favorites which equal to given property if changeFavoriteStatusAction is fulfilled and isFavorite flag of given property is "false"',
      () => {
        const initState: FavoritesSlice = {
          favorites: [mockUnfavoriteProperty]
        };

        expect(favoritesSlice.reducer(initState, {payload: mockUnfavoriteProperty, type: changeFavoriteStatusAction.fulfilled.type}))
          .toEqual({favorites: initState.favorites
            .filter((property) => property.id !== mockUnfavoriteProperty.id)
          });
      });
  });
});
