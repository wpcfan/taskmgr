import { TaskFilterVM } from '../vm';
import { getDefaultPrioritiesVMs } from '../utils/task-filter.util';
import * as actions from '../actions/task-filter-vm.action';
import * as taskFilterActions from '../actions/task-filter.action';

export const initialState: TaskFilterVM = {
  id: undefined,
  projectId: '',
  hasOwner: true,
  hasPriority: true,
  // desc: '',
  owners: [],
  priorityVMs: getDefaultPrioritiesVMs(),
}

export function reducer(state = initialState, action: actions.Actions | taskFilterActions.Actions): TaskFilterVM {
  switch (action.type) {
    case taskFilterActions.LOAD_SUCCESS:
      return { ...action.payload, owners: [], priorityVMs: getDefaultPrioritiesVMs() }
    case actions.UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}
