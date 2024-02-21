import React from 'react';
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Lista de Tareas</h1>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  );
}

export default App;
