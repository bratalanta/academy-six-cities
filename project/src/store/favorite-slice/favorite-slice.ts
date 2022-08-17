import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Properties } from '../../types/property';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';

type FavoritesSlice = {
  favorites: Properties;
}

const initialState: FavoritesSlice = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: NameSpace.Properties,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const propertyIndex = state.favorites.findIndex((property) => property.id === action.payload.id);

        if (propertyIndex > -1) {
          state.favorites.splice(propertyIndex, 1);
        } else {
          state.favorites.push(action.payload);
        }
      });
  },
});
