import React, { useState, useEffect } from 'react';
import { submitAnswers, updateAnswer } from '../../../api/api';

function AnswersForm({ question, showForm }) {
  const answer = question.answer;
  const [answerTitle, setAnswerTitle] = useState('');
  const [editingAnswerTitle, setEditingAnswerTitle] = useState('');

  const addAnswer = async (e) => {
    try {
      e.preventDefault();
      await submitAnswers(`${question.id}`, answerTitle, false);
      setAnswerTitle('');
    } catch (error) {
      console.error('답변 추가 중 에러 발생:', error);
    }
    window.location.reload();
  };

  async function handleCorrectionAnswer(e) {
    try {
      e.preventDefault();
      if (answer === null) {
        alert('수정할 대상이 아닙니다.');
      } else {
        const answerId = answer.id;
        await updateAnswer(answerId, editingAnswerTitle, false);
        setEditingAnswerTitle('');
      }
    } catch (error) {
      console.log('답변 수정 중 오류가 발생했습니다:', error);
    }
    window.location.reload();
  }

  const isInputAnswer = answerTitle.trim() === '';
  const handleChangeAnswer = editingAnswerTitle.trim() === '';

  const handleChange = (e) => {
    setAnswerTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setEditingAnswerTitle(e.target.value);
  };

  //답변 존재 유무 상태관리 + 수정 입력창 답변 관리
  useEffect(() => {
    if (answer === null) {
      setEditingAnswerTitle(editingAnswerTitle);
    } else if (answer.isRejected === true) {
      setEditingAnswerTitle(editingAnswerTitle);
    } else {
      setEditingAnswerTitle(answer.content);
    }
  }, []);

  return (
    <>
      {showForm ? (
        <form className="gap-3 text-base font-normal">
          <textarea
            type="text"
            value={editingAnswerTitle}
            onChange={handleTextChange}
            placeholder="답변을 입력해주세요"
            className={`w-[532px] h-[186px] p-[16px] text-left text-[var(--Grayscale-60)] bg-[var(--Grayscale-20)] ${
              handleChangeAnswer
                ? 'rounded-lg border-[var(--Brown-40)] border-2 whitespace-normal resize-none'
                : 'rounded-lg border-[var(--Brown-40)] border-2 outline-none whitespace-normal resize-none'
            }`}
          />
          <button
            onClick={handleCorrectionAnswer}
            className={`w-[532px] h-[46px] text-center text-[var(--Grayscale-10)] rounded-lg ${
              handleChangeAnswer
                ? 'bg-[var(--Brown-30)] cursor-not-allowed'
                : 'bg-[var(--Brown-40)] cursor-pointer'
            }`}
            disabled={handleChangeAnswer}
          >
            수정 완료
          </button>
        </form>
      ) : (
        <form className="gap-3 text-base font-normal">
          <textarea
            type="text"
            value={answerTitle}
            onChange={handleChange}
            placeholder="답변을 입력해주세요"
            className="w-full h-[186px] p-4 text-left text-[var(--Grayscale-60)] bg-[var(--Grayscale-20)] rounded-lg border-[var(--Brown-40)] border-2 outline-none whitespace-normal resize-none"
          />
          <button
            onClick={addAnswer}
            className={`w-full h-[46px] text-center text-[var(--Grayscale-10)] rounded-lg ${
              isInputAnswer
                ? 'bg-[var(--Brown-30)] cursor-not-allowed'
                : 'bg-[var(--Brown-40)] cursor-pointer'
            }`}
            disabled={isInputAnswer}
          >
            답변 완료
          </button>
        </form>
      )}
    </>
  );
}

export default AnswersForm;
