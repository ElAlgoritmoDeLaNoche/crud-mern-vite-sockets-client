import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CreateTaskForm = ({ fetchTasks }) => {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append('title', title)
			formData.append('description', description)
			formData.append('image', image)

			await axios.post('http://localhost:5002/api/tasks', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			setTitle('')
			setDescription('')
			setImage(null)
			fetchTasks()
		} catch (error) {
			console.error('Error creating task:', error)
		}
	}

	const handleImageChange = (e) => {
		setImage(e.target.files[0])
	}

	return (
		<div>
			<h2>Add New Task</h2>
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
			<div>
				<label>Image:</label>
				<input
					type="file"
					onChange={handleImageChange}
					required
				/>
			</div>
			<button onClick={handleSubmit}>Add Task</button>
		</div>
	)
}

export default CreateTaskForm
