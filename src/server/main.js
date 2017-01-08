//console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../client/Counter.jsx';
import { createStore, combineReducers } from 'redux';
//import './db.js';

const counter = (state = 0, action) => {
  switch (action.type){
      case 'INCREMENT' :
        return state + 1;
      case 'DECREMENT' :
        return state - 1;
      default:
        return state;
  }
  console.log(state);
}
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
const store = createStore(counter);
console.log(store);
//var Element = () => (<div>{store.getState()}</div>);
/*
ReactDOM.render (
  React.createElement(Element), document.getElementById('mount')
);
*/



const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={ () => store.dispatch({type: 'INCREMENT'}) }
      onDecrement={ () => store.dispatch({type: 'DECREMENT'}) }
      />,
    document.getElementById('mount')
  );
};

store.subscribe(render);
//ReactDOM.render();
render();

const addCounter = (list) => {
   return [...list, 0];
};

const removeCounter = (list,index) => {
  return [
      ...list.slice(0, index),
      ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index+1)
  ];
};

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
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount')
  );
});*/
