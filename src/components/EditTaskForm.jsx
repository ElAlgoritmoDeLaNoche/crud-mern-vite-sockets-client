// EditTaskForm.js
import React, { useState, useEffect } from 'react';
import socket from '../services/socketService';

function EditTaskForm({ task }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('editarTarea', { id: task._id, title, description });

    setTitle('')
    setDescription('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <br />
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default EditTaskForm;