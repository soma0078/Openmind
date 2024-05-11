import React, { useState } from 'react';
import moreImage from '../../../assets/icon-more.svg';

import KebabModal from './KebabModal';

function KebabButton({ question, handleDataChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(question);
  // const answer = question.answer;

  // const updatedContent = '테스트 변경 값';

  // const handleOptionClick = (option) => {
  //   console.log(`선택된 옵션: ${option}`);
  //   setIsMenuOpen(false);
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="group/item hover:bg-slate-100">
      <div className="relative group/edit group-hover/item:visible">
        <button
          onClick={toggleMenu}
          // onBlur={() => {
          //   setIsMenuOpen((isMenuOpen) => !isMenuOpen);
          // }}
        >
          <img
            src={moreImage}
            alt="더보기 버튼"
            className="flex w-[26px] h-[26px] group-hover/edit:text-gray-700"
          ></img>
        </button>
        {isMenuOpen && (
          <KebabModal question={question} handleDataChange={handleDataChange} />
        )}
      </div>
    </div>
  );
}

export default KebabButton;
