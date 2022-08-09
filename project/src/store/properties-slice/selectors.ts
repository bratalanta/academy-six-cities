import { createSelector } from 'reselect';
import { getSortedProperties } from '../../components/sort-options-list/helper';
import { LoadingStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { selectCurrentCity, selectCurrentSortOption } from '../app-slice/selectors';

export const selectProperties = (state: State) => state[NameSpace.Properties].properties;
export const selectPropertiesLoadingStatus = (state: State) => state[NameSpace.Properties].propertiesLoadingStatus;
export const selectPropertyLoadingStatus = (state: State) => state[NameSpace.Properties].propertyLoadingStatus;
export const selectProperty = (state: State) => state[NameSpace.Properties].property;
export const selectPropertiesNearby = (state: State) => state[NameSpace.Properties].propertiesNearby;

export const getPropertiesLoadingStatus = createSelector(
  [
    selectPropertiesLoadingStatus,
  ],
  (status) => (
    {
      isPropertiesStatusPending: [LoadingStatus.Pending, LoadingStatus.Idle].includes(status),
      isPropertiesStatusRejected: status === LoadingStatus.Rejected,
    }
  ));

export const getPropertyLoadingStatus = createSelector(
  [
    selectPropertyLoadingStatus
  ],
  (status) => (
    {
      isPropertyStatusPending: status === LoadingStatus.Pending,
      isPropertyStatusRejected: status === LoadingStatus.Rejected,
    }
  ));

export const getMemoizedCurrentProperties = createSelector(
  [
    selectProperties,
    selectCurrentCity,
    selectCurrentSortOption
  ],
  (properties, currentCity, currentSortOption) => {
    const currentProperties = properties.filter(({city}) => currentCity.name === city.name);
    const currentSortedProperties = getSortedProperties(currentSortOption, currentProperties);

    return {currentProperties, currentSortedProperties};
  }
);
