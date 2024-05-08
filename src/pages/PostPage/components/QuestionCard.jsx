import React from 'react';
import thumbsButton from '../../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../../assets/icon-thumbs-down.svg';

function QuestionCard({ question }) {
  return (
    <div className="flex flex-col p-[32px] w-[684px] bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
      <div>답변 상태</div>
      <div>
        <span className="text-sm text-[#818181] font-medium">
          질문 &#183; 기간
        </span>
        <h3 className="text-lg">{question.content}</h3>
      </div>
      <div className="flex">
        <img src="" alt="프로필 사진" />
        <div className="flex flex-col">
          <h3>
            작성자 <span>기간</span>
          </h3>
          <p>내용</p>
        </div>
      </div>
      <div className="flex items-center gap-[32px] border-t border-[#cfcfcf] pt-6">
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={thumbsButton}
            alt="좋아요 버튼"
          />
          <span>좋아요</span>
        </div>
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={thumbsDownButton}
            alt="싫어요 버튼"
          />
          <span>싫어요</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
