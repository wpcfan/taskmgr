export const covertArrToObj = (arr) => {
  return arr.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
}

export const buildObjFromArr = (arr, dict) => {
  return arr.reduce((entities, id) => ({...entities, [id]: dict[id]}), {});
}
