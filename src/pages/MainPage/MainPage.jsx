import React from 'react'

function MainPage() {
  return (
    <div className='flex flex-col'>
      <div className='w-[1200px] h-[627px] bg-main2 bg-cover pt-[3%]'>
        <div className='flex flex-col mt-[60px] mx-auto w-[456px] gap-[15px]'>
          <img src={logoImage} alt="로고 이미지" />
          <Link to='/list?page=1&sort=createdAt'>
            <button className='absolute w-[161px] h-[46px] rounded-[8px] py-[24px] px-[12px] border-[1px] text-[16px] text-[#542F1A] justify-center items-center font-[400] bg-[#F5F1EE] top-[25px] left-[909px]'>질문하러 가기 →</button>
          </Link>
          <form className='flex flex-col items-center gap-y-[16px] w-[440px] rounded-[16px] p-[32px] bg-[#FFFFFF]'>
            <input className='w-[336px] h-[46px] rounded-[8px] py-[12px] px-[16px] border-[1px] border-[#818181] text-[16px] text-[#818181] font-[400]' onChange={handleChangeNickName} type="text" placeholder='이름을 입력하세요'/>
            <button className='w-[336px] h-[46px] rounded-[8px] py-[12px] px-[24px] bg-[#542F1A] text-[16px] text-[#FFFFFF] font-[400]' onClick={onMovePost} type='submit'>질문 받기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainPage