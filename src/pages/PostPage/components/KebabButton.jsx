import React, { useState } from 'react';
import KebabModal from './KebabModal';
import moreImage from '../../../assets/icon-more.svg';

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
          className="flex w-6 h-6 tablet-1:w-7 tablet-1:h-7"
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
