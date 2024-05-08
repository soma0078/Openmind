import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyImage from '../../assets/img-no-questions-asked.png';

function NotFoundPage() {
  const nav = useNavigate();

  const onMovePrevPage = () => {
    nav(-1);
  };

  const onMoveMainPage = () => {
    nav('/');
  };

  return (
    <div className='h-[100vh] flex flex-col items-center justify-center gap-10 bg-[#F5F1EE]'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[50px] font-[600]'>페이지를 찾을 수 없습니다.</h1>
        <img className='w-[300px] h-[300px]' src={emptyImage} alt="비어있는 상태 이미지" />
      </div>
      <div className='w-[700px] flex justify-between'>
        <button className="w-[250px] h-[46px] rounded-[8px] py-[12px] px-[24px] bg-[#542F1A] text-[16px] text-[#FFFFFF] font-[400]" onClick={onMovePrevPage}>이전 페이지</button>
        <button className="w-[250px] h-[46px] rounded-[8px] py-[12px] px-[24px] bg-[#542F1A] text-[16px] text-[#FFFFFF] font-[400]" onClick={onMoveMainPage}>메인으로 가기</button>
      </div>
    </div>
  )
};

export default NotFoundPage;