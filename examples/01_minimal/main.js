/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalState } from '../../src/index';

const initialState = {
  counter: 0,
  text: 'hello',
};
const { useGlobalState } = createGlobalState(initialState);

const Counter = () => {
  const [value, update] = useGlobalState('counter');
  return (
    <div>
      <span>
        Count:
        {value}
      </span>
      <button type="button" onClick={() => update(value + 1)}>+1</button>
      <button type="button" onClick={() => update(value - 1)}>-1</button>
    </div>
  );
};

const TextBox = () => {
  const [value, update] = useGlobalState('text');
  return (
    <div>
      <span>
        Text:
        {value}
      </span>
      <input value={value} onChange={event => update(event.target.value)} />
    </div>
  );
};

const App = () => (
  <div>
    <h1>Counter</h1>
    <Counter />
    <Counter />
    <h1>TextBox</h1>
    <TextBox />
    <TextBox />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
