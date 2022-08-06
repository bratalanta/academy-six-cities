import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectReviews = (state: State) => state[NameSpace.Reviews].reviews;
export const selectReviewsLoadingStatus = (state: State) => state[NameSpace.Reviews].loadingStatus;
