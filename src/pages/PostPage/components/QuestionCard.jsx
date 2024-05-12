import React, { useState } from 'react';
import thumbsButton from '../../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../../assets/icon-thumbs-down.svg';
import { formatDateAge } from '../../../utils/utils';
import { postQuestionReaction } from '../../../api/api';
import AnswersForm from './AnswersForm';

function QuestionCard({ question }) {
  const [likeCount, setLikeCount] = useState(question.like);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  const [likeReaction, setLikeReaction] = useState(
    sessionStorage.getItem(`like-${question.id}`) || 0,
  );
  const [dislikeReaction, setDislikeReaction] = useState(
    sessionStorage.getItem(`dislike-${question.id}`) || 0,
  );

  const handleReaction = async (type) => {
    if (type === 'like') {
      if (likeReaction === 1) {
        alert('이미 반응을 선택하셨습니다.');
        return;
      }
      setLikeCount(likeCount + 1);
      setLikeReaction(1);
      sessionStorage.setItem(`like-${question.id}`, 1);
    } else if (type === 'dislike') {
      if (dislikeReaction === 1) {
        alert('이미 반응을 선택하셨습니다.');
        return;
      }
      setDislikeCount(dislikeCount + 1);
      setDislikeReaction(1);
      sessionStorage.setItem(`dislike-${question.id}`, 1);
    }

    await postQuestionReaction(question.id, type);
  };

  return (
    <div className="flex flex-col p-[32px] w-[684px] bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
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
      <div>
        <span className="text-sm text-[#818181] font-medium">
          질문 · {formatDateAge(question.createdAt)}
        </span>
        <h3 className="text-lg">{question.content}</h3>
      </div>
      {!question.answer ? (
        <div className="flex">
          <img src="" alt="프로필 사진" />
          <div className="flex flex-col">
            <h3>작성자 {question.answer && <span>기간</span>}</h3>
            <AnswersForm question={question} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex">
            <img src="" alt="프로필 사진" />
            <div className="flex flex-col">
              <h3 className="text-[18px] text-[400]">
                작성자
                <span className="text-[14px] text-[500] text-[var(--Grayscale-40)]">
                    {formatDateAge(question.answer.createdAt)}
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
            className={`w-[24px] h-[24px] cursor-pointer ${likeReaction === 1 ? 'text-blue-500' : ''}`}
            src={thumbsButton}
            alt="좋아요 버튼"
            onClick={() => handleReaction('like')}
          />
          <span>{likeCount} 좋아요</span>
        </div>
        <div className="flex gap-[6px]">
          <img
            className={`w-[24px] h-[24px] cursor-pointer ${dislikeReaction === 1 ? 'text-red-500' : ''}`}
            src={thumbsDownButton}
            alt="싫어요 버튼"
            onClick={() => handleReaction('dislike')}
          />
          <span>{dislikeCount} 싫어요</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
