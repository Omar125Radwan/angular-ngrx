import { increment, decrement, reset, customIncrement, changeChannleName } from './counter.action';
import { Action, createReducer, on } from "@ngrx/store";
import { CounterState, initialState } from "./counter.state";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter > 0 ? state.counter - 1 : 0,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannleName, (state) => {
    return {
      ...state,
      channelName: 'Omar Radwan Ngrx'
    }
  }),
);
export function counterReducer(state: CounterState | undefined, action: Action) {
  return _counterReducer(state, action);
}

/* export function counterReducer(state: { counter: number; } | undefined, action: any) {
  return _counterReducer(state, action);
}
 */
