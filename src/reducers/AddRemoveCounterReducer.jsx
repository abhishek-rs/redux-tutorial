

const addCounter = (list) => {
   return [...list, 0];
};

const removeCounter = (list) => {
  return [
      ...list.slice(0, list.length - 1)
  ];
};

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index+1)
  ];
};

const decrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] - 1,
    ...list.slice(index+1)
  ];
};

export default function AddRemoveCounterReducer( state = [], action){
  switch (action.type){
      case 'ADD_COUNTER' :
        return addCounter(state);
      case 'REMOVE_COUNTER' :
        return removeCounter(state);
      case 'INCREMENT_COUNTER' :
        return incrementCounter(state, action.id);
      case 'DECREMENT_COUNTER' :
        return decrementCounter(state, action.id);
      default:
        return state;
  }
}
