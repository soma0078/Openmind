import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyImage from '../../assets/img-no-questions-asked.png';

function NotFoundPage() {
  const nav = useNavigate();

  const onMovePrevPage = () => {
    nav('/list', { replace: true });
  };

  const onMoveMainPage = () => {
    nav('/', { replace: true });
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-10 bg-[var(--Brown-10)]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold tablet-1:text-6xl">
          페이지를 찾을 수 없습니다.
        </h1>
        <img
          className="w-[300px] h-[300px]"
          src={emptyImage}
          alt="비어있는 상태 이미지"
        />
      </div>
      <div className="w-[450px] flex justify-between tablet-1:w-[700px]">
        <button
          className="w-[150px] h-[35px] rounded-lg flex justify-center items-center bg-[var(--Brown-40)] text-base text-[var(--Grayscale-10)] font-normal tablet-1:w-[150px] tablet-1:h-[35px]"
          onClick={onMovePrevPage}
        >
          이전 페이지
        </button>
        <button
          className="w-[150px] h-[35px] rounded-lg flex justify-center items-center bg-[var(--Brown-40)] text-base text-[var(--Grayscale-10)] font-normal tablet-1:w-[150px] tablet-1:h-[35px]"
          onClick={onMoveMainPage}
        >
          메인으로 가기
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
