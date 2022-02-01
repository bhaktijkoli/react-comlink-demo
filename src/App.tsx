import React from 'react';
import logo from './logo.svg';
import useComlink from 'react-use-comlink'
import { WorkerClass } from './worker'
import './App.css';

function App() {
  const [state, setState] = React.useState(0)

  const { proxy } = useComlink<typeof WorkerClass>(
    () => new Worker('./worker.ts'),
    []
  )

  React.useEffect(() => {
    (async () => {
      const classInstance = await new proxy(0)
      await classInstance.increment(1)
      setState(await classInstance.counter)
    })()
  }, [proxy])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{state}</div>
      </header>
    </div>
  );
}

export default App;
