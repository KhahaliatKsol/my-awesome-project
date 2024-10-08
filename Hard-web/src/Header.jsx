import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import "./Header.css";
import Sun from "./Sun.svg"; // Import Sun image
import Moon from "./Moon.svg"; // Import Moon image

const Header = ({ onToggleDarkMode }) => {
  const { t } = useTranslation(); // Get the translation function
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (isDarkMode) {
      bodyClass.add('dark-theme');
    } else {
      bodyClass.remove('dark-theme');
    }
    onToggleDarkMode(isDarkMode);
  }, [isDarkMode, onToggleDarkMode]);

  return (
    <header className="header">
      <h1 className="header-title">{t('header.title')}</h1> {/* Use translation */}
      <div className="dark_mode">
        <input
          className='dark_mode_input'
          type='checkbox'
          id='darkmode-toggle'
          checked={isDarkMode}
          onChange={() => setIsDarkMode(prevMode => !prevMode)}
        />
        <label className={`dark_mode_label ${isDarkMode ? 'dark-theme' : ''}`} htmlFor='darkmode-toggle'>
          <div className="slider">
            <img 
              src={isDarkMode ? Moon : Sun} 
              alt={isDarkMode ? t('toggle.switch_to_light_mode') : t('toggle.switch_to_dark_mode')} 
              className='icon' 
            />
          </div>
        </label>
      </div>
    </header>
  );
};

export default Header;
