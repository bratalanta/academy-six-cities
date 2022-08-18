import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { GroupedProperties } from '../../types/property';
import { State } from '../../types/state';

export const selectFavorites = (state: State) => state[NameSpace.Favorites].favorites;

export const getGroupedFavoriteProperties = createSelector(
  [selectFavorites],
  (properties) => (
    properties.reduce<GroupedProperties>(
      (acc, property) => {
        const {city} = property;

        if (!acc[city.name]) {
          acc[city.name] = [];
        }

        acc[city.name].push(property);

        return acc;
      }, {})
  )
);
