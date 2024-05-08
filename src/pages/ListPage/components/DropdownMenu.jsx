import React, { useState } from "react";
import arrowUp from "../assets/arrow-up.png";

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sortSelection, setSortSelection] = useState("최신순");

  const sortingOptions = [
    { label: "이름순", value: "name" },
    { label: "최신순", value: "createdAt" },
  ];

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSortSelection = (value, label) => {
    onSortSelection(value);
    setSortSelection(label);
    setIsDropdownVisible(false);
  };

  return (
    <div
      className="w-[79px] h-[34px] rounded-lg border-[1px] bg-[#ffffff]
    border-[#000000] text-[14px] font-medium"
    >
      <button
        className="flex gap-[4px] justify-center items-center px-[11px] py-[5px]"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownVisible}
      >
        {sortSelection}
        <img className="w-[14px] h-[14px]" src={arrowUp} alt="드롭다운 토글" />
      </button>

      {isDropdownVisible && (
        <div
          className="mt-[5px] w-[79px] h-[68px] rounded-lg border-[1px] bg-[#ffffff
        border-[#8c8c8c] text-[14px] font-medium text-center cursor-pointer">
          {sortingOptions.map((option) => (
            <div
              key={option.value}
              className={`w-[79px] h-[30px] px-[6px] py-[8px] text-center ${
                sortSelection === option.label
                  ? "text-[#1877F2]"
                  : "text-[#515151]"
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
