import React, { useRef, useId, useState, useEffect } from 'react';
import { submitQuestion } from '../api/api';
import { updateButtonText } from '../utils/utils';
import useOnClickOutside from '../hooks/useOnClickOutside';
import iconClose from '../assets/icon-close.svg';
import iconMessage from '../assets/icon-messages.svg';

function Modal({ userData, onQuestionSubmitted }) {
  const dialogRef = useRef();
  const textareaId = useId();
  const [questionContent, setQuestionContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('질문 작성하기'); // 버튼 텍스트 상태 추가

  //모달이 닫힐 때 상태 초기화
  const resetModalState = () => {
    setQuestionContent(''); // 입력한 내용 초기화
    setIsModalOpen(false);
  };

  // 모달 닫기 버튼 클릭 시 모달 상태 초기화
  const handleCloseModal = () => {
    resetModalState();
  };

  // 모달 외부 클릭 시 모달 상태 초기화
  useOnClickOutside(dialogRef, () => {
    resetModalState();
  });

  const handleContentChange = (e) => {
    setQuestionContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = await submitQuestion(userData.id, questionContent);
      console.log('질문이 성공적으로 전송되었습니다.', questionContent);
      // 질문 전송 후 입력창 비우기
      resetModalState();
      // 질문이 등록되면 상태를 업데이트
      onQuestionSubmitted(newQuestion);
    } catch (error) {
      console.error('질문 전송에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    // 페이지 로드시 한번 실행
    updateButtonText(setButtonText, '질문 작성', '질문 작성하기');

    // 윈도우 사이즈 변경시마다 실행
    window.addEventListener('resize', () =>
      updateButtonText(setButtonText, '질문 작성', '질문 작성하기'),
    );

    // Clean up
    return () =>
      window.removeEventListener('resize', () =>
        updateButtonText(setButtonText, '질문 작성', '질문 작성하기'),
      );
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[123px] h-[54px] md:w-[208px] md:h-[54px] rounded-full py-3 px-6 bg-[var(--Brown-40)] text-xl text-[var(--Grayscale-10)] font-normal"
      >
        {buttonText}
      </button>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50"></div>
          <dialog
            ref={dialogRef}
            className="fixed z-50 -translate-x-1/2 -translate-y-1/2 shadow-xl top-2/4 left-2/4 rounded-3xl p-9 max-md:p-6"
            open={true}
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
                To.
                <img
                  src={userData.imageSource}
                  alt={userData.imageSource}
                  className="rounded-full w-7 h-7"
                />
                {userData.name}
              </label>
              <textarea
                id={textareaId}
                value={questionContent}
                onChange={handleContentChange}
                placeholder="질문을 입력해주세요"
                className="w-[33rem] min-w-72 h-44 rounded-md block bg-slate-100 p-3 mt-3 mb-2 outline-[var(--Brown-40)]/40 resize-none max-md:w-full max-md:h-96"
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
      )}
    </div>
  );
}

export default Modal;
