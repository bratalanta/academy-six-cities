import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectPropeties = (state: State) => state[NameSpace.Properties].properties;
export const selectPropetiesLoadingStatus = (state: State) => state[NameSpace.Properties].loadingStatus;
