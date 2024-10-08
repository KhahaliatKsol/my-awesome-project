import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation(); // Import the i18n instance

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value); // Change language based on selection
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language: </label>
      <select id="language-select" onChange={handleLanguageChange} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="am">አማርኛ</option>
        {/* Add more language options here as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
