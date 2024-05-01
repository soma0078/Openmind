import { useRef, useId, useState } from 'react';
import iconClose from '../assets/icon-close.svg';
import iconMessage from '../assets/icon-messages.svg';

function QuestionModal() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('질문 전송', questionContent);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="rounded-full bg-amber-950 text-white px-6 py-3 shadow-xl"
      >
        질문 작성하기
      </button>
      <dialog ref={dialogRef} className="rounded-3xl shadow-xl p-9 relative">
        <div className="flex gap-1 mb-9">
          <img src={iconMessage} alt="" />
          <h2 className="text-2xl">질문을 작성하세요</h2>
        </div>
        <button onClick={handleCloseModal} className="absolute top-9 right-9">
          <img src={iconClose} alt="close button" />
        </button>
        <form onSubmit={handleSubmit}>
          <lable htmlFor={textareaId} className="flex gap-1 text-lg">
            To. <img src={iconMessage} alt="img" /> NAME
          </lable>
          <textarea
            id={textareaId}
            value={questionContent}
            onChange={handleContentChange}
            placeholder="질문을 입력해주세요"
            rows={4}
            cols={40}
            className="w-96 rounded-md block bg-slate-100 p-3 mt-3 mb-2 outline-[#542F1A]/40"
          />
          <button
            type="submit"
            disabled={!questionContent.trim()} // textarea 값이 비어있으면 비활성화
            className={`w-96 rounded-md bg-amber-950 text-white px-6 py-3 block ${
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
