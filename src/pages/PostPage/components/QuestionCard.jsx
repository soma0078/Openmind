import React, { useEffect, useState } from 'react';
import thumbsButton from '../../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../../assets/icon-thumbs-down.svg';
import { formatDateAge } from '../../../utils/utils';
import AnswersForm from './AnswersForm';
import { getUserData } from '../../../api/api';
import { useParams } from 'react-router-dom';

function QuestionCard({ question }) {
  const [userData, setUserData] = useState('');
  const { postId } = useParams();

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
            <p className="text-[14px] font-[400] md:text-[18px]">작성자</p>
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
                작성자
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
