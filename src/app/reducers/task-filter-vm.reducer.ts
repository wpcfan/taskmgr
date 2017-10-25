import { TaskFilterVM } from '../vm';
import {
  getDefaultTaskFilterVM,
  getTaskFilterVM,
  getOwnerVMs
} from '../utils/task-filter.util';
import * as actions from '../actions/task-filter-vm.action';
import * as taskFilterActions from '../actions/task-filter.action';

export const initialState: TaskFilterVM = getDefaultTaskFilterVM();

export function reducer(state = initialState, action: actions.Actions | taskFilterActions.Actions): TaskFilterVM {
  switch (action.type) {
    case taskFilterActions.LOAD_SUCCESS:
      return getTaskFilterVM(action.payload);
    case actions.LOAD_OWNERS_SUCCESS:
      return { ...state, ownerVMs: getOwnerVMs(action.payload) };
    case actions.UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}
