import React from 'react';

class AddRemoveCounterComp extends React.Component {
  constructor() {
    super();

  }

  render() {
    var addRemove = [];
    addRemove = this.props.store.getState().map(
      (s,i) => (<div key={i}>
        <h1>{s}</h1>
      <button onClick={() => this.props.store.dispatch({id: i, type: 'INCREMENT_COUNTER'})}>+</button>
      <button onClick={() => this.props.store.dispatch({id: i, type: 'DECREMENT_COUNTER'})}>-</button>
    </div>
      )
    );

    return (
      <div>
        {addRemove}
        </div>
    );
  }

}
export default AddRemoveCounterComp;
