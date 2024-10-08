// ToggleButton.js
import React, { useState } from 'react';


const ToggleButton = () => {
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    // Call your sorting function here if needed
    // sortTasks();
  };

  return (
    <div className={`toggle-switch ${sortOrder === 'asc' ? '' : 'active'}`} onClick={toggleSortOrder}>
      <div className="toggle-slider"></div>
      <div className="toggle-labels">
        {sortOrder === 'asc' ? (
          <span className="active">ASC</span>
        ) : (
          <span className="inactive">DESC</span>
        )}
      </div>
    </div>
  );
};

export default ToggleButton;
