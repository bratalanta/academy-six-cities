import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { Properties, Property } from '../../types/property';
import { changeFavoritePropertyStatus } from '../../utils';
import { changeFavoriteStatusAction, fetchPropertiesAction, fetchPropertiesNearbyAction, fetchPropertyAction } from '../api-actions';

export type PropertiesSlice = {
  properties: Properties;
  property?: Property
  propertiesNearby: Properties;
  propertiesLoadingStatus: LoadingStatus;
  propertyLoadingStatus: LoadingStatus;
}

const initialState: PropertiesSlice = {
  properties: [],
  propertiesNearby: [],
  propertiesLoadingStatus: LoadingStatus.Idle,
  propertyLoadingStatus: LoadingStatus.Idle,
};

export const propertiesSlice = createSlice({
  name: NameSpace.Properties,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesAction.pending, (state) => {
        state.propertiesLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchPropertiesAction.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.propertiesLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPropertiesAction.rejected, (state) => {
        state.propertiesLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchPropertyAction.pending, (state) => {
        state.propertyLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchPropertyAction.fulfilled, (state, action) => {
        state.property = action.payload;
        state.propertyLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPropertyAction.rejected, (state) => {
        state.propertyLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchPropertiesNearbyAction.fulfilled, (state, action) => {
        state.propertiesNearby = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.properties = state.properties
          .map((property) => changeFavoritePropertyStatus(property, action.payload));

        state.propertiesNearby = state.propertiesNearby
          .map((property) => changeFavoritePropertyStatus(property, action.payload));

        if (state.property?.id === action.payload.id) {
          state.property = action.payload;
        }
      });
  },
});
