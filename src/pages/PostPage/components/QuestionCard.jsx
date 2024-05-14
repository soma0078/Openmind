import React, { useEffect, useRef, useState } from 'react';
import thumbsUpButtonGray from '../../../assets/icon-thumbs-up-gray.svg';
import thumbsUpButtonBlue from '../../../assets/icon-thumbs-up-blue.svg';
import thumbsDownButtonGray from '../../../assets/icon-thumbs-down-gray.svg';
import thumbsDownButtonBlack from '../../../assets/icon-thumbs-down-black.svg';
import { formatDateAge } from '../../../utils/utils';
import { postQuestionReaction } from '../../../api/api';
import AnswersForm from './AnswersForm';
import { getUserData } from '../../../api/api';
import { useParams } from 'react-router-dom';
import { setLocalStorage } from '../../../utils/localStorage';

function QuestionCard({ question }) {
  const [userData, setUserData] = useState('');
  const { postId } = useParams();
  const [likeCount, setLikeCount] = useState(question.like);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);

  const likeClicked = useRef(
    localStorage.getItem(`${question.id}-like`) ? true : false,
  );
  const dislikeClicked = useRef(
    localStorage.getItem(`${question.id}-dislike`) ? true : false,
  );

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserData(postId);
        setUserData(userData);
      } catch (error) {
        console.error('사용자 데이터를 불러오는데 실패했습니다.', error);
      }
    }
    fetchUserData();
  }, []);

  //좋아요와 싫어요를 로컬스토리지와 비교해서 좋아요와 싫어요가 1이상이면 각 리액션에 알림창이 뜸
  const handleReaction = async (type) => {
    const key = `${question.id}-${type}`;
    const reaction = localStorage.getItem(key);

    if (reaction) {
      alert('이미 반응을 선택하셨습니다.');
      return;
    }

    const success = setLocalStorage(question.id, null, type);

    if (success) {
      await postQuestionReaction(question.id, type);
      if (type === 'like') {
        setLikeCount(likeCount + 1);
        likeClicked.current = true;
      } else if (type === 'dislike') {
        setDislikeCount(dislikeCount + 1);
        dislikeClicked.current = true;
      }
    } else {
      alert('이미 반응을 선택하셨습니다.');
    }
  };

  return (
    <div className="flex flex-col p-[32px] w-[295px] md:w-[672px] xl:w-[684px] bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
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
        <span className="text-[14px] text-[#818181] font-[500]">
          질문 &#183; {formatDateAge(question.createdAt)}
        </span>
        <p className="text-[16px] font-[400] md:text-[18px]">
          {question.content}
        </p>
      </div>
      {!question.answer ? (
        <div className="flex gap-[12px]">
          <img
            className="rounded-full object-cover w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <div className="flex flex-col w-[203px] md:w-[548px] xl:w-[560px]">
            <p className="text-[14px] font-[400] md:text-[18px]">
              {userData.name}
            </p>
            <AnswersForm question={question} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-[12px]">
            <img
              className="rounded-full object-cover w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
              src={userData.imageSource}
              alt="프로필 사진"
            />
            <div className="text-[16px] font-[400] flex flex-col w-[203px] md:w-[548px] xl:w-[560px]">
              <p className="text-[14px] font-[400] md:text-[18px]">
                {userData.name}
                <span className="text-[14px] text-[500] text-[var(--Grayscale-40)]">
                  &nbsp; {formatDateAge(question.answer.createdAt)}
                </span>
              </p>
              {question.answer.content}
            </div>
          </div>
        </>
      )}
      <div className="flex items-center gap-[32px] border-t border-[#cfcfcf] pt-6">
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={likeClicked.current ? thumbsUpButtonBlue : thumbsUpButtonGray}
            alt="좋아요 버튼"
            onClick={() => handleReaction('like')}
          />
          <span
            className={`cursor-pointer ${likeClicked.current ? 'text-[var(--Blue-50)]' : 'text-[var(--Grayscale-40)]'}`}
            onClick={() => handleReaction('like')}
          >
            좋아요 {likeCount}개
          </span>
        </div>
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={
              dislikeClicked.current
                ? thumbsDownButtonBlack
                : thumbsDownButtonGray
            }
            alt="싫어요 버튼"
            onClick={() => handleReaction('dislike')}
          />
          <span
            className={`cursor-pointer ${dislikeClicked.current ? 'text-[var(--Grayscale-60)]' : 'text-[var(--Grayscale-40)]'}`}
            onClick={() => handleReaction('dislike')}
          >
            싫어요 {dislikeCount}개
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
