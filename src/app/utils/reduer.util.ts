export function covertArrToObj<T extends {id?: string}>(arr: T[]) {
  return arr.reduce((entities, obj: T) => ({...entities, [<string>obj.id]: obj}), {});
};

export function buildObjFromArr<T>(arr: string[], dict: {[id: string]: T}) {
  return arr.reduce((entities, id) => ({...entities, [id]: dict[id]}), {});
};

export function loadCollection<T extends {id?: string}>(state: {ids: string[]; entities: {[id: string]: T}}, collection: T[]) {
  const newItems = collection.filter(item => !state.entities[<string>item.id]);
  const newIds = newItems.map(item => <string>item.id);
  const newEntities = covertArrToObj<T>(newItems);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

export function updateOne<T extends {id?: string}>(state: {ids: string[]; entities: {[id: string]: T}}, updated: T) {
  const entities = {...state.entities, [<string>updated.id]: updated};
  return {...state, entities: entities};
};

export function deleteOne<T extends {id?: string}>(state: {ids: string[]; entities: {[id: string]: T}}, deleted: T) {
  const newIds = state.ids.filter(id => id !== <string>deleted.id);
  const newEntities = buildObjFromArr(newIds, state.entities);
  return {ids: newIds, entities: newEntities}
};

export function addOne<T extends {id?: string}>(state: {ids: string[]; entities: {[id: string]: T}}, added: T) {
  const newIds = [...state.ids, <string>added.id];
  const newEntities = {...state.entities, [<string>added.id]: added};
  return {ids: newIds, entities: newEntities};
};
