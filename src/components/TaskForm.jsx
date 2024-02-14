// frontend/src/components/TaskForm.js

import React, { useState } from 'react'
import socket from '../services/socketService' // Importa socketService

function TaskForm() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Enviar datos del formulario al servidor backend utilizando socketService
    socket.emit('crearTarea', { title, description })

    // Limpiar los campos del formulario después de enviarlos
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <br />
      <button type="submit">Crear Tarea</button>
    </form>
  )
}

export default TaskForm
