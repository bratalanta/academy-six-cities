import { createSelector } from 'reselect';
import { getSortedProperties } from '../../components/sort-options-list/helper';
import { LoadingStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { selectCurrentCity, selectCurrentSortOption } from '../app-slice/selectors';

export const selectProperties = (state: State) => state[NameSpace.Properties].properties;
export const selectPropertiesLoadingStatus = (state: State) => state[NameSpace.Properties].loadingStatus;

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
