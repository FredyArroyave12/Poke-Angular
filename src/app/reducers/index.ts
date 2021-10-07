import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface State {
  router: RouterReducerState;
}
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};
