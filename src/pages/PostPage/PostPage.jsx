import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserData, fetchQuestionsByUser } from '../../api/api';
import QuestionList from './components/QuestionList';
import Share from './components/Share';
import Modal from '../../components/Modal';
import logoImage from '../../assets/img-logo.png';
import emptyImage from '../../assets/img-no-questions-asked.png';
import messageImage from '../../assets/icon-messages.svg';

const LIMIT = 5;

function PostPage() {
  const [questionCardCount, setQuestionCardCount] = useState(0);
  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const { postId } = useParams();
  const nav = useNavigate();

  const onMoveBack = () => {
    nav(-1);
  };

  // 컴포넌트 마운트 시, 사용자 데이터 및 초기 질문 데이터 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 데이터 가져오기
        const userData = await getUserData(postId);
        setUserData(userData);

        // 초기 질문 데이터 가져오기
        const initialQuestions = await fetchQuestionsByUser(
          userData,
          offset,
          LIMIT,
        );
        setQuestionData(initialQuestions);
        setQuestionCardCount(initialQuestions.length);
        setOffset(offset + LIMIT);
      } catch (error) {
        console.error('데이터를 불러오는 중에 오류가 발생했습니다.', error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, []);

  // 질문 데이터 추가로 불러오기
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const loadMoreQuestions = await fetchQuestionsByUser(
        userData,
        offset,
        LIMIT,
      );
      if (loadMoreQuestions.length > 0) {
        setQuestionData((prevQuestions) => [
          ...prevQuestions,
          ...loadMoreQuestions,
        ]);
        setQuestionCardCount(questionCardCount + loadMoreQuestions.length);
        setOffset(offset + LIMIT);
      }
    } catch (error) {
      console.error('추가 데이터를 불러오는 중에 오류가 발생했습니다.', error);
    } finally {
      setLoading(false);
    }
  }, [userData, offset, questionCardCount]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      // 스크롤이 페이지 하단에 도달하면 추가 데이터 로드
      const nextOffset = questionData.length;
      if (nextOffset >= userData.questionCount) {
        return;
      }
      setLoading(true);
      fetchQuestions(nextOffset)
        .then(() => setLoading(false))
        .catch((error) => {
          console.log('데이터를 불러오는 중 오류가 발생했습니다.', error);
          setLoading(false);
        });
    }
  }, [fetchQuestions, loading, questionData, userData.questionCount]);

  // 페이지 로드마다 스크롤 이벤트 리스터 등록하고 언마운트될 때 제거
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 새로운 질문을 추가해 questionCardCount 상태 업데이트
  const addQuestion = async (newQuestion) => {
    try {
      // 새로운 질문이 전달될 때마다 사용자 데이터를 다시 가져와서 질문 수 업데이트
      const updateUserData = await getUserData(userData.id);

      // 새로운 질문 데이터를 포함해 질문 데이터 상태 업데이트
      setQuestionData((prevQuestions) => [newQuestion, ...prevQuestions]);

      // 질문 수 업데이트
      setQuestionCardCount((prevCount) => prevCount + 1);

      // 사용자 데이터 업데이트
      setUserData(updateUserData);
    } catch (error) {
      console.error(
        '질문 데이터를 업데이트하는 동안 오류가 발생했습니다.',
        error,
      );
    }
  };

  return (
    <div className="flex flex-col h-[234px]">
      <div className="bg-[#F9F9F9] bg-main1 bg-contain bg-no-repeat">
        <div className="pt-[50px] gap-[20px] flex flex-col items-center justify-center">
          <Link to="/">
            <img
              className="w-[170px] h-[67px]"
              src={logoImage}
              alt="로고 이미지"
            />
          </Link>
          <img
            className="w-[136px] h-[136px] rounded-full"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <h2 className="font-[400] text-[32px] text-[#000000]">
            {userData.name}
          </h2>
          <Share />
        </div>
      </div>
      <div className="flex justify-center pt-[30px] pb-[80px] bg-[#F9F9F9]">
        <div className="flex flex-col items-center w-[716px] p-[16px] border-[1px] border-[#C7BBB5] rounded-[16px] gap-[18px] bg-[#F5F1EE]">
          <div className="flex items-center gap-[8px]">
            {/* 질문이 없을 때 */}
            {questionCardCount === 0 && (
              <div className="flex flex-col items-center gap-2 w-[716px] h-[330px]">
                <div className="flex justify-center gap-2">
                  <img
                    className="w-[24px] h-[24px]"
                    src={messageImage}
                    alt="메시지 이모티콘"
                  />
                  <span className="font-[400] text-[20px] text-[#542F1A]">
                    아직 질문이 없습니다.
                  </span>
                </div>
                <img
                  className="w-[150px] h-[154px] translate-y-[30%]"
                  src={emptyImage}
                  alt="비어있는 상태 이미지"
                />
              </div>
            )}

            {/* 질문이 있을 때 */}
            <div className="flex flex-col gap-2">
              {questionCardCount > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <img
                    className="w-[24px] h-[24px]"
                    src={messageImage}
                    alt="메시지 이모티콘"
                  />
                  <span className="font-[400] text-[20px] text-[#542F1A]">
                    {userData.questionCount}개의 질문이 있습니다.
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="questionlist">
            <QuestionList questionData={questionData} />
          </div>
        </div>
      </div>
      <div className="relative flex justify-between bottom-[80px] px-[30px]">
        <button
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
          onClick={onMoveBack}
        >
          뒤로 가기
        </button>
        <Modal
          userData={userData}
          onQuestionSubmitted={addQuestion}
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
        />
      </div>
    </div>
  );
}

export default PostPage;
