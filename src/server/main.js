//console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../client/Counter.jsx';
import { createStore, combineReducers } from 'redux';
import CounterReducer from '../reducers/CounterReducer.jsx';
import AddRemoveCounterReducer from '../reducers/AddRemoveCounterReducer.jsx';
import AddRemoveCounterComp from '../client/AddRemoveCounterComp';

//import './db.js';


/*
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter( l => l !== listener);

    };
  };

  dispatch({});

  return {getState, dispatch, subscribe};
};
*/

console.log(CounterReducer);
const counterStore = createStore(CounterReducer);
const addRemoveCounterStore = createStore(AddRemoveCounterReducer);

//console.log(store);
//var Element = () => (<div>{store.getState()}</div>);
/*
ReactDOM.render (
  React.createElement(Element), document.getElementById('mount')
);
*/
var count = 0;/*
var addRemoveCounterComp = addRemoveCounterStore.getState().map(
  (s,i) => (<div key={i}>
    <h1>{s}</h1>
  <button onClick={() => addRemoveCounterStore.dispatch({id: i, type: 'INCREMENT_COUNTER'})}>+</button>
  <button onClick={() => addRemoveCounterStore.dispatch({id: i, type: 'DECREMENT_COUNTER'})}>-</button>
</div>
  )
);*/



const render = () => {
  ReactDOM.render(
    <div>
    <Counter
      value={counterStore.getState()}
      onIncrement={ () => counterStore.dispatch({type: 'INCREMENT'}) }
      onDecrement={ () => counterStore.dispatch({type: 'DECREMENT'}) }
      />
    <AddRemoveCounterComp store={addRemoveCounterStore}/>
    <button onClick = {() => addRemoveCounterStore.dispatch({type: 'ADD_COUNTER'})}>Add counter</button>
    <button onClick = {() => addRemoveCounterStore.dispatch({type: 'REMOVE_COUNTER'})}>Remove counter</button>

  </div>,
    document.getElementById('mount')
  );
};

counterStore.subscribe(render);
addRemoveCounterStore.subscribe(render);
//ReactDOM.render();
render();



const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

/* or

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};

*/
const todo = ( state = [] , action) => {
  switch (action.type){
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id){
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action) );

    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

/*
const todoApp = (state={}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
*/


const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

/*
//combineReducers manual implementation

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};



*/
/*
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount')
  );
});*/
