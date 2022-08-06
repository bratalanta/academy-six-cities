import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { Properties } from '../../types/property';
import { fetchPropertiesAction } from '../api-actions';

type PropertiesSlice = {
  properties: Properties;
  loadingStatus: LoadingStatus;
}

const initialState: PropertiesSlice = {
  properties: [],
  loadingStatus: LoadingStatus.Idle,
};

export const propertiesSlice = createSlice({
  name: NameSpace.Properties,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesAction.pending, (state) => {
        state.loadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchPropertiesAction.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPropertiesAction.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
      });
  },
});
