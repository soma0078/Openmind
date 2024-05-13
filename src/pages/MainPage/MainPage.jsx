import React, { useState } from 'react';
import logoImage from '../../assets/img-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { createCard } from '../../api/api';
import { setLocalStorage } from '../../utils/localStorage';
import PersonIcon from '../../assets/icon-person.svg';

function MainPage() {
  const regex = /^[가-힣a-zA-Z0-9]+$/;
  const [nickName, setNickName] = useState(null);

  const nav = useNavigate();

  const checkIsNickName = () => {
    return nickName;
  };

  const handleChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const onMovePost = () => {
    const isNickName = checkIsNickName();
    if (isNickName.length >= 3 && regex.test(isNickName) && isNickName.length <= 10) {
      createCard(nickName).then(result => {
        setLocalStorage(result.id, result.name);
      });
      nav('/list');
    } else {
      alert('올바른 닉네임을 작성해주세요.');
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#F8F7F7] bg-main2 bg-cover bg-top-center bg-no-repeat">
      <div className="flex flex-col items-center mx-auto w-[258px] pt-[25%] h- gap-[15px] tablet-1:w-[1200px] tablet-1:pt-0 table-2:w-[900ox] table-2:h-[180px]">
        <img src={logoImage} alt="로고 이미지" />
        <Link to="/list">
          <button className="relative flex justify-center items-center w-[161px] h-[46px] rounded-[8px] py-[24px] px-[12px] border-[1px] border-[#542F1A] text-[16px] text-[#542F1A] font-[600] bg-[#F5F1EE] top-[5%] right-[10%] tablet-1:absolute">
            질문하러 가기 →
          </button>
        </Link>
        <form className="flex flex-col items-center gap-y-[16px] w-[305px] rounded-[16px] p-[24px] bg-[#FFFFFF] tablet-2:p-[32px] tablet-1:w-[400px] tablet-2:w-[440px]">
          <img src={PersonIcon} alt="사람 아이콘" />
          <input
            className="w-[257px] h-[46px] rounded-[8px] py-[12px] px-[16px] border-[1px] border-[#818181] text-[16px] text-[#818181] font-[400] text-center tablet-2:w-[336px]"
            onChange={handleChangeNickName}
            type="text"
            placeholder="공백없는 3~10글자 닉네임을 작성해주세요."
          />
          <button
            className="w-[257px] h-[46px] rounded-[8px] py-[12px] px-[24px] bg-[#542F1A] text-[16px] text-[#FFFFFF] font-[400] tablet-2:w-[336px]"
            onClick={onMovePost}
            type="submit"
          >
            피드 생성
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainPage;
