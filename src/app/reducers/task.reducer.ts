import {Task, Project} from '../domain';
import {createSelector} from 'reselect';
import {
  covertArrToObj,
  buildObjFromArr,
  addOne,
  deleteOne,
  updateOne,
  loadCollection
} from '../utils/reduer.util';
import * as actions from '../actions/task.action';
import * as prjActions from '../actions/project.action';
import * as _ from 'lodash';

export interface State {
  ids: string[];
  entities: { [id: string]: Task };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const addTask = (state, action) => {
  if (state.entities[(<Task>action.payload).id]) {
    return state;
  }
  return addOne(state, action.payload);;
};

const delTask = (state, action) => {
  return deleteOne(state, action.payload);
};

const loadTasks = (state, action) => {
  if ((<Task[]>action.payload).length === 0) {
    return state;
  }
  return loadCollection(state, action.payload);
};

const moveAllTasks = (state, action) => {
  const tasks = <Task[]>action.payload;
  // if task is null then return the orginal state
  if (tasks === null) {
    return state;
  }
  const updatedTasks = tasks.filter(task => state.entities[task.id]);
  const updatedEntities = covertArrToObj(updatedTasks);
  return {...state, entities: {...state.entities, ...updatedEntities}};
};

const delTasksByPrj = (state, action) => {
  const project = <Project>action.payload;
  const listIds = project.taskLists;
  const remainingIds = state.ids.filter(id => _.indexOf(listIds, state.entities[id].taskListId) === -1);
  const remainingEntities = buildObjFromArr(remainingIds, state.entities);
  return {ids: remainingIds, entities: remainingEntities};
};

const updateTask = (state, action) => {
  return updateOne(state, action.payload);
};

export function reducer (state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addTask(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delTask(state, action);
    case prjActions.ActionTypes.DELETE_SUCCESS:
      return delTasksByPrj(state, action);
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS:
      return updateTask(state, action);
    case actions.ActionTypes.LOAD_IN_LISTS_SUCCESS:
      return loadTasks(state, action);
    case actions.ActionTypes.MOVE_ALL_SUCCESS:
      return moveAllTasks(state, action);
    default:
      return state;
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getTasks = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
