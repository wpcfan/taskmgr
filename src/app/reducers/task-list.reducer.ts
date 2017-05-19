import { TaskList } from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/task-list.action';

export interface State{
  ids: string [];
  entities: { [id: string]: TaskList };
  drag: string | null;
  drop: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  drag: null,
  drop: null
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:{
      const taskList = <TaskList>action.payload;
      const ids = [...state.ids, taskList.id];
      const entities = Object.assign({}, state.entities, {[taskList.id]: taskList})
      return Object.assign({}, state, {ids: ids, entities: entities});
    }    
    case actions.ActionTypes.DELETE_SUCCESS:{
      const taskList = <TaskList>action.payload;
      const ids = state.ids.filter(id => id !== taskList.id);
      const entities = ids.reduce((entities: { [id: string]: TaskList }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        })
      },{});
      return Object.assign({}, state, {ids: ids, entities: entities});
    }
    case actions.ActionTypes.UPDATE_SUCCESS:{
      const taskList = <TaskList>action.payload;
      const entities = Object.assign({}, state.entities, {[taskList.id]: taskList});
      return Object.assign({}, state, {entities: entities});
    }
    case actions.ActionTypes.LOADS_SUCCESS:{
      const taskLists = <TaskList[]>action.payload;
      // if taskList is null then return the orginal state
      if(taskLists === null) return state; 
      const newTaskLists = taskLists.filter(taskList => !state.entities[taskList.id]);
      const newIds = newTaskLists.map(taskList => taskList.id);
      const newEntities = newTaskLists.reduce((entities: { [id: string]: TaskList }, taskList: TaskList) => {
        return Object.assign(entities, {
          [taskList.id]: taskList
        })
      },{});
      return {
        ids: [...state.ids, ...newIds],
        entities: Object.assign({}, state.entities, newEntities),
        drag: state.drag,
        drop: state.drop
      }
    }
    case actions.ActionTypes.DRAG:
      return Object.assign({}, state, {drag: action.payload});
    case actions.ActionTypes.DROP:{
      if(state.drag === null || action.payload === null) return state;
      const targetId = <string>action.payload;
      const srcId = state.drag;
      const target = state.entities[targetId];
      const src = state.entities[srcId];
      const newTarget = Object.assign({}, target, {order: src.order});
      const newSrc = Object.assign({}, src, {order: target.order});
      return Object.assign({}, state, {
        drop: targetId,
        entities: Object.assign({}, state.entities, {
          [srcId]: newSrc, [targetId]: newTarget})});
    }
    case actions.ActionTypes.LOADS_FAIL:
    case actions.ActionTypes.ADD_FAIL:
    case actions.ActionTypes.UPDATE_FAIL:
    case actions.ActionTypes.DELETE_FAIL:
    default:
      return state;
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getTaskLists = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
export const getDrag = (state) => state.drag;
export const getDrop = (state) => state.drop;
export const getDragTask = createSelector(getEntities, getDrag, (entities, id) => {
  return entities[id];
});
export const getDropTask = createSelector(getEntities, getDrop, (entities, id) => {
  return entities[id];
});