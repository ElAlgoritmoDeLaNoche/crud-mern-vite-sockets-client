import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';

const socket = io('http://localhost:5002');

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };

    fetchTasks();

    socket.on('tareaCreada', (nuevaTarea) => {
      setTasks((prevTasks) => [...prevTasks, nuevaTarea]);
    });

    socket.on('tareaEditada', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    return () => {
      socket.off('tareaCreada');
      socket.off('tareaEditada');
    };
  }, []);

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      const response = await axios.post(
        'http://localhost:5002/api/tasks',
        taskData
      );
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log('Nueva tarea creada:', newTask);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  const handleEditTaskSubmit = async (updatedTaskData) => {
    try {
      const response = await axios.put(
        `http://localhost:5002/api/tasks/${updatedTaskData._id}`,
        updatedTaskData
      );
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      console.log('Tarea actualizada:', updatedTask);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button style={{ marginRight: '10px' }} onClick={() => handleEditTask(task)}>Editar</button>
            {/* <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button> */}
          </li>
        ))}
      </ul>

      {selectedTask ? (
        <EditTaskForm task={selectedTask} onSubmit={handleEditTaskSubmit} />
      ) : (
        <TaskForm onSubmit={handleTaskSubmit} />
      )}
    </div>
  );
}

export default TaskList;