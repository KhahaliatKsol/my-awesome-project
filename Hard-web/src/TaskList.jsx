import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TaskList = ({ tasks, onDelete, onComplete, onEditTask, isDarkMode }) => {
  const { t } = useTranslation(); // Translation hook

  return (
    <ul className={`task-list ${isDarkMode ? 'dark-mode' : ''}`}>
      {tasks.length === 0 ? (
        <li className="empty-message">{t("task_list.no_tasks")}</li>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div>
              <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
              <p>{task.description}</p>
              <p>{t("task_list.due_date")}: {new Date(task.dueDate).toLocaleString()}</p>
            </div>
            <div className="task-buttons">
              <button 
                onClick={() => onComplete(task.id)} 
                className="complete-button" 
                aria-label={task.completed ? t("task_list.undo_task") : t("task_list.complete_task")}
              >
                {task.completed ? t("task_list.undo") : t("task_list.complete")}
              </button>
              <button 
                onClick={() => onEditTask(task)} 
                className="edit-button" 
                aria-label={t("task_list.edit_task")}
              >
                {t("task_list.edit")}
              </button>
              <button 
                onClick={() => onDelete(task.id)} 
                className="delete-button" 
                aria-label={t("task_list.delete_task")}
              >
                {t("task_list.delete")}
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

// PropTypes for validation
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default TaskList;
