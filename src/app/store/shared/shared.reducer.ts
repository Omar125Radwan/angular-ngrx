import { setLoadingSpinner, setErrorMessage } from './shared.action';
import { initialState } from './shared.state';
import { createReducer, Action, on } from '@ngrx/store';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
  )
export function SharedReducer(state: any, action: Action) {
  return _sharedReducer(state, action);
}
