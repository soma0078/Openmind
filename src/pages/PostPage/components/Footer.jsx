import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';

function Footer({ userData, questionCardCount, questionData }) {
  const nav = useNavigate();

  const onMoveBack = () => {
    nav(-1);
  };

  // 새로운 질문을 추가해 상태 업데이트
  const addQuestion = (newQuestion) => {
    // 새로운 질문이 추가될 때마다 questionCardCount를 증가
    questionCardCount((prevCount) => prevCount + 1);
    questionData((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

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
