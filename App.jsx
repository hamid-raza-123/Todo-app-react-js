import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editingIndex === index ? (
              <input
                type="text"
                className="form-control"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              task
            )}
            <div>
              {editingIndex === index ? (
                <button className="btn btn-success me-2" onClick={handleSaveEdit}>
                  Save
                </button>
              ) : (
                <button className="btn btn-warning me-2" onClick={() => handleEditTask(index)}>
                  Edit
                </button>
              )}
              <button className="btn btn-danger" onClick={() => handleDeleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button className="btn btn-danger mt-3" onClick={handleDeleteAllTasks}>
          Delete All Tasks
        </button>
      )}
    </div>
  );
};

export default App;
