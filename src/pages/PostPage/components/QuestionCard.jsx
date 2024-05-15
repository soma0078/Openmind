import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postQuestionReaction } from '../../../api/api';
import { getUserData } from '../../../api/api';
import { setReactionStorage } from '../../../utils/localStorage';
import { formatDateAge } from '../../../utils/utils';
import AnswersForm from './AnswersForm';
import KebabButton from './KebabButton';
import thumbsUpButtonGray from '../../../assets/icon-thumbs-up-gray.svg';
import thumbsUpButtonBlue from '../../../assets/icon-thumbs-up-blue.svg';
import thumbsDownButtonGray from '../../../assets/icon-thumbs-down-gray.svg';
import thumbsDownButtonBlack from '../../../assets/icon-thumbs-down-black.svg';

function QuestionCard({ question, displayMode }) {
  const { postId } = useParams();
  const [userData, setUserData] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);

  let questionLike = `${question.id}-like`;
  let questionDislike = `${question.id}-dislike`;

  const [likeClicked, setLikeClicked] = useState(
    localStorage.getItem(questionLike) ? true : false,
  );

  const [dislikeClicked, setDislikeClicked] = useState(
    localStorage.getItem(questionDislike) ? true : false,
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const likeStatus = userData[`${question.id}-like`];
    const dislikeStatus = userData[`${question.id}-dislike`];

    console.log(`Like status for question ${question.id}:`, likeStatus);
    console.log(`Dislike status for question ${question.id}:`, dislikeStatus);

    setLikeClicked(likeStatus ? true : false);
    setDislikeClicked(dislikeStatus ? true : false);
  }, []);

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

    const success = setReactionStorage(question.id, type);

    if (success) {
      await postQuestionReaction(question.id, type);
      if (type === 'like') {
        setLikeCount(likeCount + 1);
        setLikeClicked(true);
      } else if (type === 'dislike') {
        setDislikeCount(dislikeCount + 1);
        setDislikeClicked(true);
      }
    } else {
      alert('이미 반응을 선택하셨습니다.');
    }
  };

  //답변 수정 입력 창 상태관리
  const handleDataChange = (e) => {
    setShowForm(e);
  };

  return (
    <div className="flex flex-col p-8 w-[295px] md:w-[672px] xl:w-[684px] bg-[var(--Grayscale-10)] rounded-2xl gap-8 shadow-md mb-5">
      <div className="flex items-center justify-between">
        {/* showForm = true 일때 수정 중/ 답변이 있을 때 답변 완료/ 답변이 없을 때 미답변 */}
        {showForm ? (
          <span className="flex justify-center items-center h-7 py-1 px-3 rounded-lg border-2 border-solid border-[var(--Brown-50)] bg-[var(--Brown-40)] text-sm font-medium text-center text-[var(--Brown-10)]">
            수정 중
          </span>
        ) : question.answer ? (
          <span className="flex justify-center items-center h-7 py-1 px-3 rounded-lg border-2 border-solid border-[var(--Brown-40)] text-sm font-medium text-center text-[var(--Brown-40)]">
            답변 완료
          </span>
        ) : (
          <span className="flex justify-center items-center h-7 py-1 px-3 rounded-lg border-2 border-solid border-[var(--Grayscale-40)] text-sm font-medium text-center text-[var(--Grayscale-40)]">
            미답변
          </span>
        )}
        <KebabButton question={question} handleDataChange={handleDataChange} />
      </div>
      <div>
        <span className="text-sm text-[var(--Grayscale-40)] font-medium">
          질문 &#183; {formatDateAge(question.createdAt)}
        </span>
        <p className="text-base font-normal whitespace-pre-wrap md:text-lg">
          {question.content}
        </p>
      </div>
      {/* showForm = true 일때 수정 완료 버튼/ 답변이 없을 때 답변 완료 버튼/
        답변이 있을 때 질문- isRejected = true 이면 답변 거절 출력 */}
      {showForm ? (
        <div className="flex gap-3">
          <img
            className="object-cover w-8 h-8 rounded-full md:w-12 md:h-12"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <div className="flex flex-col w-[203px] md:w-[548px] xl:w-[560px]">
            <p className="text-sm font-normal md:text-lg">{userData.name}</p>
            <AnswersForm question={question} showForm={showForm} />
          </div>
        </div>
      ) : !question.answer ? (
        <div className="flex gap-3">
          <img
            className="object-cover w-8 h-8 rounded-full md:w-12 md:h-12"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <div className="flex flex-col w-[203px] md:w-[548px] xl:w-[560px]">
            <p className="text-sm font-normal md:text-lg">{userData.name}</p>
            <AnswersForm question={question} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <img
              className="object-cover w-8 h-8 rounded-full md:w-12 md:h-12"
              src={userData.imageSource}
              alt="프로필 사진"
            />
            <div className="text-base font-normal flex flex-col w-[203px] md:w-[548px] xl:w-[560px] whitespace-pre-wrap">
              <p className="text-sm font-normal md:text-lg">
                {userData.name}
                <span className="text-sm font-base text-[var(--Grayscale-40)]">
                  &nbsp; {formatDateAge(question.answer.createdAt)}
                </span>
              </p>
              {question.answer.isRejected === true ? (
                <div className="text-base font-normal text-[var(--Red-50)]">
                  답변 거절
                </div>
              ) : (
                question.answer.content
              )}
            </div>
          </div>
        </>
      )}
      <div className="flex items-center gap-8 border-t border-[var(--Grayscale-30)] pt-6">
        <div className="flex gap-1 tablet-2:gap-2">
          <img
            className="w-6 h-6 cursor-pointer"
            src={likeClicked ? thumbsUpButtonBlue : thumbsUpButtonGray}
            alt="좋아요 버튼"
            onClick={() => handleReaction('like')}
          />
          <span
            className={`cursor-pointer ${likeClicked ? 'text-[var(--Blue-50)]' : 'text-[var(--Grayscale-40)]'}`}
            onClick={() => handleReaction('like')}
          >
            좋아요 {likeCount}개
          </span>
        </div>
        <div className="flex gap-1 tablet-2:gap-2">
          <img
            className="w-6 h-6 cursor-pointer"
            src={dislikeClicked ? thumbsDownButtonBlack : thumbsDownButtonGray}
            alt="싫어요 버튼"
            onClick={() => handleReaction('dislike')}
          />
          <span
            className={`cursor-pointer ${dislikeClicked ? 'text-[var(--Grayscale-60)]' : 'text-[var(--Grayscale-40)]'}`}
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
