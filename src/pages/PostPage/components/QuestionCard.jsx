import React from 'react';
import thumbsButton from '../../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../../assets/icon-thumbs-down.svg';
import { formatDateAge } from '../../../utils/utils';
import AnswersForm from './AnswersForm';
import moreImage from '../../../assets/icon-more.svg';

function QuestionCard({ question, userData }) {
  const img = userData.imageSource;

  return (
    <div className="flex flex-col p-[32px] max-w-[684px] min-w-[295px] bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
      <div className="flex justify-between">
        <div className="flex">
          {question.answer ? (
            <div className="w-[61px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Brown-40)]">
              <div className="text-[14px] font-medium text-center text-[var(--Brown-40)]">
                답변
              </div>
            </div>
          ) : (
            <div className="w-[61px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Grayscale-40)]">
              <div className="text-[14px] font-medium text-center text-[var(--Grayscale-40)]">
                미답변
              </div>
            </div>
          )}
        </div>
        <img
          src={moreImage}
          alt="더보기 버튼"
          className="flex w-[26px] h-[26px]"
        />
      </div>
      <div>
        <span className="text-sm text-[#818181] font-medium">
          질문 &#183; {formatDateAge(question.createdAt)}
        </span>
        <h3 className="text-lg">{question.content}</h3>
      </div>
      {!question.answer ? (
        <div className="flex gap-[12px]">
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
          <div className="flex gap-[12px]">
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
