import React, { useState, useEffect } from 'react';
import './EditTaskModal.css';
import { useTranslation } from 'react-i18next';

const EditTaskModal = ({ task, onUpdateTask, onClose }) => {
  const { t } = useTranslation(); // Translation hook
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
  }, [task]); // Reset state when the task prop changes

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskDueDate = new Date(dueDate);
    const currentDate = new Date();

    // Check if the due date is in the past
    if (taskDueDate < currentDate) {
      setErrorMessage(t("edit_task.error.future_date")); // Use translation for error message
      return;
    }

    setErrorMessage(''); // Clear error message
    onUpdateTask({ ...task, title, description, dueDate });
    onClose(); // Close the modal after updating
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="edit-task-title" aria-modal="true">
      <h2 id="edit-task-title">{t("edit_task.title")}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder={t("edit_task.placeholder.title")} // Use translation for placeholder
          required 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder={t("edit_task.placeholder.description")} // Use translation for placeholder
          required 
        />
        <input 
          type="datetime-local" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          required 
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
        <div className="modal-buttons">
          <button type="submit">{t("edit_task.button.update")}</button> {/* Use translation for button text */}
          <button type="button" onClick={onClose}>{t("edit_task.button.cancel")}</button> {/* Use translation for button text */}
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
