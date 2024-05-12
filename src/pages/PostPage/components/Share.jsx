import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shareKakao, shareFacebook } from '../utils/SharesUtils';
import linkImage from '../../../assets/icon-link.svg';
import kakaoImage from '../../../assets/icon-kakaotalk.svg';
import facebookImage from '../../../assets/icon-facebook.svg';
import Toast from './Toast';

function Share() {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 mb-2">
          <CopyToClipboard
            className="CopyLink flex justify-center items-center w-10 h-10 rounded-[200px] bg-[#542F1A]"
            text={window.location.href}
            onCopy={handleShowToast}
          >
            <button var="icon">
              <img className="w-5 h-5" src={linkImage} alt="링크공유" />
            </button>
          </CopyToClipboard>
          <button
            var="icon"
            className="flex justify-center items-center w-10 h-10 rounded-[200px] bg-[#FEE500]"
            onClick={shareKakao}
          >
            <img className="w-5 h-5" src={kakaoImage} alt="카카오톡으로 공유" />
          </button>
          <button
            var="icon"
            className="flex justify-center items-center w-10 h-10 rounded-[200px] bg-[#1877F2]"
            onClick={shareFacebook}
          >
            <img
              className="w-5 h-5"
              src={facebookImage}
              alt="페이스북으로 공유"
            />
          </button>
        </div>
      </div>
      <Toast show={showToast}>클립보드에 복사되었습니다.</Toast>
    </>
  );
}

export default Share;
