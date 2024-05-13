import React, { useState } from 'react';
import moreImage from '../../../assets/icon-more.svg';

import KebabModal from './KebabModal';

function KebabButton({ question, handleDataChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        <img
          src={moreImage}
          alt="더보기 버튼"
          className="flex w-[26px] h-[26px]"
        ></img>
      </button>
      {isMenuOpen && (
        <KebabModal
          question={question}
          handleDataChange={handleDataChange}
          toggleMenu={toggleMenu}
        />
      )}
    </div>
  );
}

export default KebabButton;
