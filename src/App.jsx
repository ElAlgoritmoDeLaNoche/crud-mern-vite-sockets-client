import React from 'react';
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

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
