// TaskList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EditTaskForm from './EditTaskForm'
import CreateTaskForm from './CreateTaskForm'

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [taskToEdit, setTaskToEdit] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleEditTask = (task) => {
    setTaskToEdit(task)
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/tasks/${id}`)
      // Refrescar la lista de tareas después de eliminar
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div>
      <div className='tasks-container'>
        <h2>Tasks:</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <img src={`http://localhost:5002/${task.imageUrl}`} width='100px' height='100px' alt='Task' />
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
        {taskToEdit ? <EditTaskForm taskToEdit={taskToEdit} fetchTasks={fetchTasks} /> : <CreateTaskForm fetchTasks={fetchTasks} />}
      </div>
    </div>
  )
}

export default TaskList
