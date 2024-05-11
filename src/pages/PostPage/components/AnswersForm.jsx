import React, { useState } from 'react';
import { submitAnswers, updateAnswer } from '../../../api/api';

function AnswersForm({ question, showForm }) {
  const [answerTitle, setAnswerTitle] = useState('');
  const answer = question.answer;

  const addAnswer = async (e) => {
    try {
      e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
      await submitAnswers(`${question.id}`, answerTitle, false);
      setAnswerTitle('');
    } catch (error) {
      console.error('답변 추가 중 에러 발생:', error);
    }
  };

  async function handleCorrectionAnswer(e) {
    try {
      if (answer === null) {
        console.log('수정할 대상이 아닙니다.');
      } else {
        const answerId = answer.id;
        await updateAnswer(answerId, answerTitle, false);
        setAnswerTitle('');
      }
    } catch (error) {
      console.log('답변 수정 중 오류가 발생했습니다:', error);
    }
  }

  const isInputNotEmpty = answerTitle.trim() !== '';

  const handleChange = (e) => {
    // 입력 필드 값이 변경될 때마다 answerTitle 상태를 업데이트
    setAnswerTitle(e.target.value);
  };

  return (
    <>
      <div>
        {showForm ? (
          <form className="font-[400] text-[16px] gap-[10px]">
            <textarea
              type="text"
              value={answerTitle}
              onChange={handleChange} // 입력 필드 값 변경 시 handleChange 함수 호출
              placeholder="답변을 입력해주세요"
              className={`w-[532px] h-[186px] p-[16px] text-left text-[var(--Grayscale-60)] bg-[var(--Grayscale-20)] ${
                isInputNotEmpty
                  ? ' rounded-lg outline-none whitespace-normal resize-none'
                  : ' rounded-lg outline-none border-blue-500 whitespace-normal resize-none cursor-not-allowed'
              }`}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCorrectionAnswer(e);
              }}
              className={`w-[532px] h-[46px] text-center text-[var(--Grayscale-10)] rounded-lg ${
                isInputNotEmpty
                  ? 'bg-[var(--Brown-40)]'
                  : 'bg-[var(--Brown-30)] cursor-not-allowed'
              }`}
              disabled={!isInputNotEmpty}
            >
              수정 완료
            </button>
          </form>
        ) : (
          <form className="font-[400] text-[16px] gap-[10px]">
            <textarea
              type="text"
              value={answerTitle}
              onChange={handleChange} // 입력 필드 값 변경 시 handleChange 함수 호출
              placeholder="답변을 입력해주세요"
              className="w-[532px] h-[186px] p-[16px] text-left text-[var(--Grayscale-60)] bg-[var(--Grayscale-20)] rounded-lg outline-none whitespace-normal resize-none"
            />
            <button
              onClick={addAnswer}
              className={`w-[532px] h-[46px] text-center text-[var(--Grayscale-10)] rounded-lg ${
                isInputNotEmpty
                  ? 'bg-[var(--Brown-40)]'
                  : 'bg-[var(--Brown-30)] cursor-not-allowed'
              }`}
              disabled={!isInputNotEmpty}
            >
              답변 완료
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default AnswersForm;
