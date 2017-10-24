import { TaskFilterVM } from '../vm';
import {
  getDefaultFilterCategoryVMs,
  getDefaultPrioritiesVMs,
  getDefaultOwnerVMs,
  getFilterCategoryVMs,
  getOwnerVMs
} from '../utils/task-filter.util';
import * as actions from '../actions/task-filter-vm.action';
import * as taskFilterActions from '../actions/task-filter.action';

export const initialState: TaskFilterVM = {
  id: undefined,
  projectId: '',
  hasOwner: true,
  hasPriority: true,
  ownerVMs: getDefaultOwnerVMs(),
  priorityVMs: getDefaultPrioritiesVMs(),
  categoryVMs: getDefaultFilterCategoryVMs(),
}

export function reducer(state = initialState, action: actions.Actions | taskFilterActions.Actions): TaskFilterVM {
  switch (action.type) {
    case taskFilterActions.LOAD_SUCCESS:
      return { ...action.payload, ownerVMs: [], priorityVMs: getDefaultPrioritiesVMs(), categoryVMs: getFilterCategoryVMs(action.payload) }
    case actions.LOAD_OWNERS_SUCCESS:
      return { ...state, ownerVMs: getOwnerVMs(action.payload) };
    case actions.UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}
