import React, { useState } from 'react';
import { submitAnswers } from '../../../api/api';

function AnswersForm({ question }) {
  const [answerTitle, setAnswerTitle] = useState('');

  const addAnswer = async (e) => {
    try {
      // e.preventDefault(); // 기본 동작(페이지 새s로고침) 방지
      const response = await submitAnswers(
        `${question.id}`,
        answerTitle,
        false,
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // 서버로부터 응답을 받고 나면 입력 필드 초기화
      setAnswerTitle('');
    } catch (error) {
      console.error('답변 추가 중 에러 발생:', error);
    }
  };

  const isInputNotEmpty = answerTitle.trim() !== '';

  return (
    <>
      <div>
        <form
          onSubmit={addAnswer}
          className="font-[400] text-[16px] gap-[10px]"
        >
          <textarea
            type="text"
            value={answerTitle}
            onChange={(e) => setAnswerTitle(e.target.value)}
            placeholder="답변을 입력해주세요"
            className="w-full h-[186px] p-[16px] text-left text-[var(--Grayscale-60)] bg-[var(--Grayscale-20)] rounded-lg outline-none whitespace-normal resize-none"
          />
          <button
            className={`w-full h-[46px] text-center text-[var(--Grayscale-10)] rounded-lg ${
              isInputNotEmpty
                ? 'bg-[var(--Brown-40)]'
                : 'bg-[var(--Brown-30)] cursor-not-allowed'
            }`}
            type="submit"
            disabled={!isInputNotEmpty}
          >
            답변 완료
          </button>
        </form>
      </div>
    </>
  );
}

export default AnswersForm;
