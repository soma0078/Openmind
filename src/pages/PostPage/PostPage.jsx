import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserData, fetchQuestionsByUser } from '../../api/api';
import QuestionList from './components/QuestionList';
import Share from './components/Share';
import logoImage from '../../assets/img-logo.png';
import emptyImage from '../../assets/img-no-questions-asked.png';
import messageImage from '../../assets/icon-messages.svg';
import Footer from './components/Footer';
import DeleteButton from './components/DeleteButton';

function PostPage() {
  const [questionCardCount, setQuestionCardCount] = useState(0);
  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const { postId } = useParams();

  // 컴포넌트가 마운트될 때 API를 호출해 사용자 데이터 가져옴
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
  }, [postId]);

  // 사용자 데이터가 변경될 때마다 질문 데이터를 가져와 상태 설정
  useEffect(() => {
    async function fetchQuestions() {
      try {
        //더보기 버튼 만들기 위함 next 링크
        const fetchedQuestionData = await fetchQuestionsByUser(userData);
        const fetchedQuestionResults = fetchedQuestionData.results;
        console.log('--------------------------------222');
        console.log(fetchedQuestionData);
        console.log('--------------------------------222');
        if (Array.isArray(fetchedQuestionResults)) {
          setQuestionData(fetchedQuestionResults);
          setQuestionCardCount(fetchedQuestionResults.length); // 이미 있는 질문 데이터의 개수로 초기값 설정
        } else {
          console.error('질문 데이터가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error('질문을 불러오는데 실패했습니다.', error);
      }
    }
    if (userData) {
      fetchQuestions();
    }
  }, [userData, setQuestionData]);

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
      <DeleteButton />
      <div className="flex justify-center pt-[30px] pb1-[80px] bg-[#F9F9F9]">
        <div className="flex flex-col items-center max-w-[716px] min-w-[327px] w-full p-[16px] m-[24px] border-[1px] border-[#C7BBB5] rounded-[16px] gap-[18px] bg-[#F5F1EE]">
          <div className="flex items-center gap-[8px]">
            {/* 질문이 없을 때 */}
            {questionCardCount === 0 && (
              <div className="flex flex-col items-center gap-2 max-w-[716px] min-w-[327px] w-full h-[330px]">
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
            <QuestionList questionData={questionData} userData={userData} />
          </div>
        </div>
      </div>
      <Footer
        userData={userData}
        questionCardCount={questionCardCount}
        questionData={questionData}
      />
    </div>
  );
}

export default PostPage;
