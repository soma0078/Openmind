import React, { useState } from 'react';
import moreImage from '../../../assets/icon-more.svg';
import { deleteAnswer, deleteQuestion } from '../../../api/api';

function KebabButton({ question, userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log('------------------33');
  console.log(question);
  console.log(userData);
  console.log('------------------33');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`선택된 옵션: ${option}`);
    setIsMenuOpen(false);
  };

  async function handleDeleteAnswer() {
    try {
      const answerIdDelete = await deleteAnswer(question.answer.id);
      console.log('답변이 성공적으로 삭제되었습니다:', answerIdDelete);
    } catch (error) {
      console.log('답변 삭제 중 오류가 발생했습니다:', error);
    }
  }

  async function handleDeleteQuestion() {
    try {
      const questionIdDelete = await deleteQuestion(question.id);
      console.log('질문이 성공적으로 삭제되었습니다:', questionIdDelete);
    } catch (error) {
      console.log('질문 삭제 중 오류가 발생했습니다:', error);
    }
  }

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
          <div className="block text-[14px] text-[600] absolute right-0 mt-2 w-[125px] bg-white shadow-lg rounded-lg">
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick('답변 수정하기')}
              alt="답변 수정하기 버튼"
            >
              답변 수정하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleDeleteAnswer}
              alt="답변 삭제하기 버튼"
            >
              답변 삭제하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick('답변 거절하기')}
              alt="답변 거절하기 버튼"
            >
              답변 거절하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleDeleteQuestion}
              alt="질문 삭제하기 버튼"
            >
              질문 삭제하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KebabButton;
