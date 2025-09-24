import React from 'react'

function DropdownOption({ id, value, onChange }) {
    const handleChange = (e) => {
      onChange(e);
    };
  
    return (
      <option value={id} onChange={handleChange}>
        {value}
      </option>
    );
  }

export default DropdownOption