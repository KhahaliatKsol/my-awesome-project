import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AddTask({ onAddTask }) {
  const { t } = useTranslation(); // Access the translation function
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskDate = new Date(date);

    // Check if the title, description, and date are provided
    if (!title || !description || !date) {
      setErrorMessage(t('add_task.error_fill_fields')); // Use translation for error message
      return;
    }

    // Check if the selected date is in the future
    if (taskDate < new Date()) {
      setErrorMessage(t('add_task.error_future_date')); // Use translation for future date error
      return;
    }

    setErrorMessage(''); // Clear error message
    onAddTask({ title, description, dueDate: date }); // Call the parent function with the task data
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder={t('add_task.placeholder_title')} // Localized placeholder
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input" 
        required // HTML5 validation
      />
      <textarea
        placeholder={t('add_task.placeholder_description')} // Localized placeholder
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-textarea" 
        required // HTML5 validation
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="task-date"
        min={new Date().toISOString().slice(0, 16)} // Prevent past date selection
        required // HTML5 validation
      />
      <button type="submit" className="add-button">{t('add_task.button_add')}</button> {/* Localized button text */}
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
    </form>
  );
}

export default AddTask;
