import React from 'react';
import thumbsButton from '../../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../../assets/icon-thumbs-down.svg';
import { formatDateAge } from '../../../utils/utils';
import AnswersForm from './AnswersForm';
import moreImage from '../../../assets/icon-more.svg';

function QuestionCard({ question, userData }) {
  const img = userData.imageSource;

  return (
    //흰 배경 반응형 구현 실패.
    //w-full을 넣어도 안에 있는 요소들이 자리를 자동으로 차지하고 있어서 안되는 듯.
    //최대 크기만 맞추면 되는데 ㅠㅠ
    <div className="flex flex-col p-[32px] max-w-[684px] min-w-[295px] w-full bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
      <div className="flex justify-between">
        <div className="flex">
          {question.answer ? (
            <span className="w-[76px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Brown-40)]">
              <div className="text-[14px] font-medium text-center text-[var(--Brown-40)]">
                답변 완료
              </div>
            </span>
          ) : (
            <span className="w-[61px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Grayscale-40)]">
              <div className="text-[14px] font-medium text-center text-[var(--Grayscale-40)]">
                미답변
              </div>
            </span>
          )}
        </div>
        <img
          src={moreImage}
          alt="더보기 버튼"
          className="flex w-[26px] h-[26px]"
        />
      </div>
      <div className="w-full">
        <span className="text-sm text-[#818181] font-medium">
          질문 &#183; {formatDateAge(question.createdAt)}
        </span>
        <h3 className="text-lg">{question.content}</h3>
      </div>
      {!question.answer ? (
        <div className="flex w-full gap-[12px]">
          <img
            src={img}
            alt="프로필 사진"
            className="w-[48px] h-[48px] rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-[18px] text-[400] gap-[4px]">
              {userData.name} {question.answer && <span>기간</span>}
            </h3>
            <AnswersForm question={question} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-full gap-[12px]">
            <img
              src={img}
              alt="프로필 사진"
              className="w-[48px] h-[48px] rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="text-[18px] text-[400] gap-[4px]">
                {userData.name}
                <span className="text-[14px] text-[500] text-[var(--Grayscale-40)]">
                  &nbsp; {formatDateAge(question.answer.createdAt)}
                </span>
              </h3>
              {question.answer.content}
            </div>
          </div>
        </>
      )}
      <div className="flex w-full items-center gap-[32px] border-t border-[#cfcfcf] pt-6">
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
