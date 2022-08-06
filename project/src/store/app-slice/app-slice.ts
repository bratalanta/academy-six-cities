import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortOption } from '../../const';
import { PropertyCity } from '../../types/property';
import { OptionValue } from '../../types/sort';

type InitialState = {
  currentCity: PropertyCity;
  currentSortOption: OptionValue;
}

const initialState: InitialState = {
  currentCity: DEFAULT_CITY,
  currentSortOption: SortOption.POPULAR
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentSortOption: (state, action) => {
      state.currentSortOption = action.payload;
    }
  },
});

export const {setCurrentCity, setCurrentSortOption} = appSlice.actions;
