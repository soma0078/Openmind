import React from 'react';
import Modal from '../../../components/Modal';

function Footer({ userData, onMoveBack, addQuestion }) {
  return (
    <div className="fixed bottom-[40px] left-[10px] right-[10px] shadow-black-500/50">
      <div className="relative flex justify-between px-[30px]">
        <button
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
          onClick={onMoveBack}
        >
          뒤로 가기
        </button>
        <Modal
          userData={userData}
          onQuestionSubmitted={addQuestion}
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
        />
      </div>
    </div>
  );
}

export default Footer;
