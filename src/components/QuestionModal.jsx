import { useRef, useId, useState } from 'react';
import { submitQuestion } from '../api/api';
import iconClose from '../assets/icon-close.svg';
import iconMessage from '../assets/icon-messages.svg';

function QuestionModal({ userData }) {
  const dialogRef = useRef();
  const textareaId = useId();
  const [questionContent, setQuestionContent] = useState('');

  const handleOpenModal = () => {
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
  };

  const handleContentChange = (e) => {
    setQuestionContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitQuestion(userData.id, questionContent);
      console.log('질문이 성공적으로 전송되었습니다.', questionContent);
      // 질문 전송 후 입력창 비우기
      setQuestionContent('');
    } catch (error) {
      console.error('질문 전송에 실패했습니다.', error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="rounded-full bg-amber-950 text-white px-6 py-3 shadow-xl m-96 block"
      >
        질문 작성하기
      </button>
      <dialog
        ref={dialogRef}
        className="rounded-3xl shadow-xl p-9 relative max-md:p-6"
      >
        <div className="flex gap-1 mb-9">
          <img src={iconMessage} alt="메세지 아이콘" />
          <h2 className="text-2xl max-md:text-xl">질문을 작성하세요</h2>
        </div>
        <button
          onClick={handleCloseModal}
          className="absolute top-9 right-9 max-md:top-6 max-md:right-6"
        >
          <img src={iconClose} alt="닫기 버튼 아이콘" />
        </button>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor={textareaId}
            className="flex items-center gap-1 text-lg"
          >
            To.{' '}
            <img
              src={userData.imageSource}
              alt={userData.imageSource}
              className="w-7 h-7 rounded-full"
            />
            {userData.name}
          </label>
          <textarea
            id={textareaId}
            value={questionContent}
            onChange={handleContentChange}
            placeholder="질문을 입력해주세요"
            className="w-[33rem] min-w-72 h-44 rounded-md block bg-slate-100 p-3 mt-3 mb-2 outline-[#542F1A]/40 resize-none max-md:w-full max-md:h-96"
          />
          <button
            type="submit"
            disabled={!questionContent.trim()} // textarea 값이 비어있으면 비활성화
            className={`w-full rounded-md bg-amber-950 text-white px-6 py-3 block ${
              !questionContent.trim() && 'opacity-30' // textarea 값이 비어있으면 스타일 변경
            }`}
          >
            질문 보내기
          </button>
        </form>
      </dialog>
    </>
  );
}

export default QuestionModal;
