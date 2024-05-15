import React, { useState } from 'react';
import arrowUp from '../assets/arrow-up.png';

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sortSelection, setSortSelection] = useState('최신순');

  const sortingOptions = [
    { label: '이름순', value: 'name' },
    { label: '최신순', value: 'createdAt' },
  ];

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSortSelection = (value, label) => {
    onSortSelection(value);
    setSortSelection(label);
    setIsDropdownVisible(false);
  };

  return (
    <div
      className="h-[34px] rounded-lg border-[1px] bg-[var(--Grayscale-10)]
    border-[var(--Grayscale-60)] text-base font-medium"
    >
      <button
        className="flex gap-1 justify-center items-center px-3 py-[5px]"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownVisible}
      >
        {sortSelection}
        <img className="w-4 h-4" src={arrowUp} alt="드롭다운 토글" />
      </button>

      {isDropdownVisible && (
        <div
          className="mt-1 h-16 rounded-lg border-[1px] bg-[var(--Grayscale-10)]
        border-[#8c8c8c] text-sm font-medium text-center cursor-pointer"
        >
          {sortingOptions.map((option) => (
            <div
              key={option.value}
              className={`h-7 p-2 text-center ${
                sortSelection === option.label
                  ? 'text-[#1877F2]'
                  : 'text-[#515151]'
              }`}
              onClick={() => handleSortSelection(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
