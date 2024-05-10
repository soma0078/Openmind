import React, { useState } from 'react';
import moreImage from '../../../assets/icon-more.svg';
import {
  deleteAnswer,
  deleteQuestion,
  rejectedUpdate,
  submitAnswers,
  updateAnswer,
} from '../../../api/api';

function KebabButton({ question }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const questionId = question.id;
  const answer = question.answer;

  const updatedContent = '테스트 변경 값';

  const handleOptionClick = (option) => {
    console.log(`선택된 옵션: ${option}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function handleDeleteAnswer() {
    try {
      await deleteAnswer(question.answer.id);
    } catch (error) {
      console.log('답변 삭제 중 오류가 발생했습니다:', error);
    }
  }

  async function handleDeleteQuestion() {
    try {
      await deleteQuestion(question.id);
    } catch (error) {
      console.log('질문 삭제 중 오류가 발생했습니다:', error);
    }
  }

  async function handleCorrectionAnswer() {
    try {
      if (answer === null) {
        console.log('수정할 대상이 아닙니다.');
      } else {
        const answerId = answer.id;
        await updateAnswer(answerId, updatedContent, false);
      }
    } catch (error) {
      console.log('답변 수정 중 오류가 발생했습니다:', error);
    }
  }

  async function handleRejectedAnswer() {
    try {
      if (question.answer === null) {
        //답변이 없다면 거절된 답변으로 변경
        const string = '거절된 답변입니다.';
        const addAnswer = await submitAnswers(questionId, string, true);
        console.log('답변이 성공적으로 거절되었습니다:', addAnswer);
      } else if (question.answer.isRejected === true) {
        //이미 거절된 답변이면
        console.log('이미 거절된 답변입니다.');
      } else {
        //거절이 아닌 답변이었다면
        const rejectedAnswer = await rejectedUpdate(question.answer.id);
        console.log('답변이 성공적으로 거절되었습니다:', rejectedAnswer);
      }
    } catch (error) {
      console.log('답변 거절 중 오류가 발생했습니다:', error);
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
              onClick={() => handleCorrectionAnswer()}
              aria-label="답변 수정하기 버튼"
            >
              답변 수정하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleDeleteAnswer}
              aria-label="답변 삭제하기 버튼"
            >
              답변 삭제하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleRejectedAnswer}
              aria-label="답변 거절하기 버튼"
            >
              답변 거절하기
            </div>
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleDeleteQuestion}
              aria-label="질문 삭제하기 버튼"
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
