import React, { useEffect, useState } from 'react';
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
import KebabButton from './KebabButton';

function QuestionCard({ question }) {
  const [userData, setUserData] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { postId } = useParams();
  const [likeCount, setLikeCount] = useState(question.like);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  //로컬스토리지에서 좋아요 싫어요 상태가져오고 해당값으로 초기화 하기
  const [likeClicked, setLikeClicked] = useState(
    localStorage.getItem(`${question.id}-like`) ? true : false,
  );
  const [dislikeClicked, setDislikeClicked] = useState(
    localStorage.getItem(`${question.id}-dislike`) ? true : false,
  );

  useEffect(() => {
    //로컬스토리지에서 좋아요와 싫어요 상태를 가져옴
    const likeStatus = localStorage.getItem(`${question.id}-like`);
    const dislikeStatus = localStorage.getItem(`${question.id}-dislike`);

    setLikeClicked(likeStatus ? true : false);
    setDislikeClicked(dislikeStatus ? true : false);

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
    <div className="flex flex-col p-[32px] w-[295px] md:w-[672px] xl:w-[684px] bg-[#FFFFFF] rounded-[16px] gap-[32px] shadow-md mb-5">
      <div className="flex justify-between">
        {/* showForm = true 일때 수정 중/ 답변이 있을 때 답변 완료/ 답변이 없을 때 미답변 */}
        {showForm ? (
          <span className="w-[76px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Brown-50)] bg-[var(--Brown-40)] text-[14px] font-medium text-center text-[var(--Brown-10)]">
            수정 중
          </span>
        ) : question.answer ? (
          <span className="w-[76px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Brown-40)] text-[14px] font-medium text-center text-[var(--Brown-40)]">
            답변 완료
          </span>
        ) : (
          <span className="w-[61px] h-[26px] p-[4px 12px] gap-[10px] rounded-lg border-2 border-solid border-[var(--Grayscale-40)] text-[14px] font-medium text-center text-[var(--Grayscale-40)]">
            미답변
          </span>
        )}
        <KebabButton question={question} handleDataChange={handleDataChange} />
      </div>
      <div>
        <span className="text-[14px] text-[#818181] font-[500]">
          질문 &#183; {formatDateAge(question.createdAt)}
        </span>
        <p className="text-[16px] font-[400] md:text-[18px]">
          {question.content}
        </p>
      </div>
      {/* showForm = true 일때 수정 완료 버튼/ 답변이 없을 때 답변 완료 버튼/
        답변이 있을 때 질문- isRejected = true 이면 답변 거절 출력 */}
      {showForm ? (
        <div className="flex gap-[12px]">
          <img
            className="rounded-full object-cover w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <div className="flex flex-col w-[203px] md:w-[548px] xl:w-[560px]">
            <p className="text-[14px] font-[400] md:text-[18px]">작성자</p>
            <AnswersForm question={question} showForm={showForm} />
          </div>
        </div>
      ) : !question.answer ? (
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
                작성자
                <span className="text-[14px] font-[500] text-[var(--Grayscale-40)]">
                  &nbsp; {formatDateAge(question.answer.createdAt)}
                </span>
              </p>
              {question.answer.isRejected === true ? (
                <div className="text-[16px] text-[400] text-[var(--Red-50)]">
                  답변 거절
                </div>
              ) : (
                question.answer.content
              )}
            </div>
          </div>
        </>
      )}
      <div className="flex items-center gap-[32px] border-t border-[#cfcfcf] pt-6">
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
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
        <div className="flex gap-[6px]">
          <img
            className="w-[24px] h-[24px] cursor-pointer"
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
