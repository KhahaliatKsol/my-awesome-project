// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have your CSS file
import Header from './Header';
import TaskList from './TaskList'; // Assuming you have your TaskList component
import AddTask from './AddTask'; // Assuming you have your AddTask component
import EditTaskModal from './EditTaskModal'; // Assuming you have your EditTaskModal component
import './i18n'; // import the i18n configuration
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from 'react-google-login'; // Import Google Login

const App = () => {
  const { t, i18n } = useTranslation(); // Use translation
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [showCongrats, setShowCongrats] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Added dark mode state
  const [language, setLanguage] = useState(i18n.language); // State for the selected language

  // Google Authentication state
  const [user, setUser] = useState(null); // State to hold user info

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle language change
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang); // Change the language in i18next
    setLanguage(selectedLang); // Update the state
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(task => task.id === taskId);
    if (!task.completed) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      // Sort in ascending or descending order
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
  };

  const handleSortChange = () => {
    sortTasks(); // we only have one sorting criteria (date), so we can directly call sortTasks
  };

  const handleToggleDarkMode = (value) => {
    setIsDarkMode(value);
  };

  const responseGoogle = (response) => {
    const token = response.tokenId;

    // Send the token to your backend for verification
    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        setUser(data.user); // Store user information
      } else {
        console.error(data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Language Dropdown */}
      <div className="language-select">
        <label htmlFor="language">{t('Select Language')}:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="am">አማርኛ</option>
          <option value="es">espanol</option>
          <option value="fr">French</option>
        </select>
      </div>

      <Header onToggleDarkMode={handleToggleDarkMode} />
      <AddTask onAddTask={addTask} />

      {/* Google Login Button */}
      <div>
        {!user ? ( // Show login button if user is not authenticated
          <GoogleLogin
            clientId="150395194794-neias86o0ei0b9ure3te983u05t47ecr.apps.googleusercontent.com" // Replace with your client ID
            buttonText="Sign in with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <div>
            <p>Welcome, {user.name}!</p> {/* Display user name */}
            <button onClick={() => setUser(null)}>Logout</button> {/* Logout button */}
          </div>
        )}
      </div>

      <div className="sort-button-container">
        <button onClick={() => handleSortChange('datetime-local')} className="sort-button">
          {t('sort.button_sort_by_date')}
        </button>

        <div 
          className={`toggle-switch ${sortOrder === 'asc' ? '' : 'active'}`}
          onClick={() => {
            const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newOrder);
            sortTasks(); // Sort after changing order
          }}
        >
          <div className="toggle-slider"></div>
          <div className="toggle-labels">
            {sortOrder === 'asc' ? (
              <span className="active">{t('sort.sort_order.asc')}</span>
            ) : (
              <span className="inactive">{t('sort.sort_order.desc')}</span> 
            )}
          </div>
        </div>
      </div>

      {showCongrats && <div className="congrats">{t('congrats_message')}</div>}
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={completeTask}
        onEditTask={editTask}
        isDarkMode={isDarkMode}
      />
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onUpdateTask={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default App;
