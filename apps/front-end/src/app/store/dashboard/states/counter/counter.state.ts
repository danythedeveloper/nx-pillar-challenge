import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Increment } from './counter.actions';

export interface CounterStateModel {
  count: number;
}

@State<CounterStateModel>({
  name: 'counter',
  defaults: {
    count: 0,
  },
})
@Injectable()
export class CounterState {
  constructor() {}

  @Selector()
  static getCounterState(state: CounterStateModel): CounterStateModel {
    return CounterState.getCounterState(state);
  }

  @Selector()
  static getCount(state: CounterStateModel) {
    return state.count;
  }

  @Action(Increment)
  increment({ getState, patchState }: StateContext<CounterStateModel>) {
    const state = getState();
    patchState({ count: state.count + 1 });
  }
}
