import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditTaskForm = ({ taskToEdit, fetchTasks }) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
    }
  }, [taskToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await axios.put(`http://localhost:5002/api/tasks/${taskToEdit._id}`, {
        title: title,
        description: description,
      })

      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit}>Update Task</button>
    </div>
  )
}

export default EditTaskForm
