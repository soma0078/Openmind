import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCard } from '../../api/api';
import { setLocalStorage } from '../../utils/localStorage';
import logoImage from '../../assets/img-logo.png';
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

  const createPeed = (e) => {
    e.preventDefault();
    const isNickName = checkIsNickName();
    if (
      isNickName &&
      isNickName.length >= 3 &&
      regex.test(isNickName) &&
      isNickName.length <= 7
    ) {
      createCard(nickName).then((result) => {
        setLocalStorage(result.id, result.name);
      });
      nav('/list', { replace: true });
    } else if (!isNickName) {
      alert('닉네임을 작성해주세요.');
    } else {
      alert('올바른 닉네임을 작성해주세요.');
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#F8F7F7] bg-main2 bg-cover bg-center bg-no-repeat tablet-2:bg-top-center">
      <div className="flex flex-col items-center mx-auto w-[450px] pt-2 tablet-1:w-[1200px] tablet-1:pt-0 table-2:w-[900ox] table-2:h-[180px] tablet-2:pt-0">
        <img src={logoImage} alt="로고 이미지" />
        <Link to="/list">
          <button className="relative flex justify-center items-center w-[161px] h-[46px] rounded-lg py-3 px-1 border-2 border-[var(--Brown-40)] text-base text-[var(--Brown-40)] font-semibold bg-[var(--Brown-10)] top-[5%] right-[10%] tablet-1:absolute tablet-2:py-6 tablet-2:px-3">
            질문하러 가기 →
          </button>
        </Link>
        <form className="flex flex-col items-center gap-y-4 w-[305px] rounde rounded-2xl p-6 bg-[var(--Grayscale-10)] tablet-1:w-[400px] tablet-1:p-4 tablet-2:w-[440px] tablet-2:p-5">
          <img src={PersonIcon} alt="사람 아이콘" />
          <input
            className="w-[257px] h-[46px] rounded-lg py-3 px-4 border-2 border-[var(--Grayscale-40)] text-base text-[var(--Grayscale-40)] font-normal text-center tablet-2:w-[336px]"
            onChange={handleChangeNickName}
            type="text"
            placeholder="3~7글자 닉네임을 작성해주세요"
          />
          <button
            className="w-[257px] h-[46px] rounded-lg py-3 px-6 bg-[var(--Brown-40)] text-base text-[var(--Grayscale-10)] font-normal tablet-2:w-[336px]"
            onClick={createPeed}
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
