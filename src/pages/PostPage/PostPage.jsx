import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserData, fetchQuestionsByUser, deleteAll } from '../../api/api';
import { updateButtonText } from '../../utils/utils';
import QuestionList from './components/QuestionList';
import Share from './components/Share';
import Modal from '../../components/Modal';
import logoImage from '../../assets/img-logo.png';
import emptyImage from '../../assets/img-no-questions-asked.png';
import messageImage from '../../assets/icon-messages.svg';
import headerImage from '../../assets/img-openmind1.png';
import backwardIcon from '../../assets/icon-backward.svg';

const LIMIT = 5;

function PostPage() {
  const [questionCardCount, setQuestionCardCount] = useState(0);
  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteButtonText, setDeleteButtonText] = useState('피드 삭제하기');

  const { postId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (!postId || isNaN(postId)) {
      nav('/not-found-page');
    }
  }, [postId, nav]);

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

  const deletePeed = async () => {
    if (window.confirm('피드를 삭제하시겠습니까? 삭제시, 복구되지 않습니다.')) {
      window.localStorage.removeItem(postId);
      await deleteAll(postId);
      nav('/list', { replace: true });
    } else return;
  };

  useEffect(() => {
    // 페이지 로드시 한번 실행
    updateButtonText(setDeleteButtonText, '피드 삭제', '피드 삭제하기');

    // 윈도우 사이즈 변경시마다 실행
    window.addEventListener('resize', () =>
      updateButtonText(setDeleteButtonText, '피드 삭제', '피드 삭제하기'),
    );

    // Clean up
    return () =>
      window.removeEventListener('resize', () =>
        updateButtonText(setDeleteButtonText, '피드 삭제', '피드 삭제하기'),
      );
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-[var(--Grayscale-20)]">
      <div className="relative flex flex-col items-center justify-center">
        <div className="mt-[50px] z-10 gap-5 flex flex-col items-center justify-center">
          <Link to="/">
            <img
              className="w-[124px] h-12 md:w-[170px] md:h-[67px]"
              src={logoImage}
              alt="로고 이미지"
            />
          </Link>
          <img
            className="w-[104px] h-[104px] md:w-[136px] md:h-[136px] rounded-full"
            src={userData.imageSource}
            alt="프로필 사진"
          />
          <div className="relative">
            <h2 className="font-normal text-3xl md:text-4xl text-[var(--Grayscale-60)]">
              {userData.name}
            </h2>
          </div>
          <Share />
          <div className="w-[327px] md:w-[704px] flex justify-between items-center">
            <button
              className="flex justify-center items-center w-12 h-12 rounded-full bg-[var(--Brown-30)]"
              onClick={onMoveBack}
            >
              <img
                src={backwardIcon}
                alt="뒤로가기 아이콘"
                className="w-8 h-8"
              />
            </button>
            <div className="flex justify-between gap-1 md:gap-3 bottom-20">
              <Modal userData={userData} onQuestionSubmitted={addQuestion} />
              <button
                className="w-[123px] md:w-[208px] md:h-[54px] rounded-[200px] py-3 px-6 bg-[#B93333] text-xl text-[var(--Grayscale-10)] font-normal"
                onClick={deletePeed}
              >
                {deleteButtonText}
              </button>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 object-cover w-[1200px] h-[177px] md:h-[234px]"
          src={headerImage}
          alt="헤더 이미지"
        />
      </div>
      <div className="flex justify-center py-5">
        <div className="flex flex-col items-center w-[327px] md:w-[704px] xl:w-[716px] p-4 border-2 border-[var(--Brown-30)] rounded-2xl gap-5 bg-[var(--Brown-10)]">
          <div className="flex items-center gap-[8px]">
            {/* 질문 여부에 따른 렌더링 */}
            {questionCardCount === 0 ? (
              <div className="flex flex-col items-center gap-2 w-[716px] h-[330px]">
                <div className="flex justify-center gap-2">
                  <img
                    className="w-6 h-6"
                    src={messageImage}
                    alt="메시지 이모티콘"
                  />
                  <span className="font-noral text-xl text-[var(--Brown-40)]">
                    아직 질문이 없습니다.
                  </span>
                </div>
                <img
                  className="w-[150px] h-[154px] translate-y-[30%]"
                  src={emptyImage}
                  alt="비어있는 상태 이미지"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <img
                  className="w-6 h-6"
                  src={messageImage}
                  alt="메시지 이모티콘"
                />
                <span className="font-normal text-xl text-[var(--Brown-40)]">
                  {userData.questionCount}개의 질문이 있습니다.
                </span>
              </div>
            )}
          </div>
          <div className="questionlist">
            <QuestionList questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
