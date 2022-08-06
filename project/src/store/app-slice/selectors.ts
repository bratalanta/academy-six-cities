import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectCurrentCity = (state: State) => state[NameSpace.App].currentCity;
export const selectCurrentSortOption = (state: State) => state[NameSpace.App].currentSortOption;
