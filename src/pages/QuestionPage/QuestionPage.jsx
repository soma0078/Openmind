import { useState, useEffect } from 'react';
import { getUsetData, fetchQuestionsByUser } from '../../api/api';
import QuestionModal from './components/QuestionModal';
import QuestionList from './components/QuestionList';

function QuestionPage() {
  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);

  // 컴포넌트가 마운트될 때 API를 호출해 이름 가져옴
  useEffect(() => {
    async function fetchName() {
      try {
        const userDatas = await getUsetData(5637);
        setUserData(userDatas);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      }
    }
    fetchName();
  }, []);

  // 사용자 데이터가 변경될 때마다 질문 데이터를 가져와 상태 설정
  useEffect(() => {
    async function fetchQuestionsWrapper() {
      await fetchQuestionsByUser(userData, setQuestionData);
    }
    fetchQuestionsWrapper();
  }, [userData]);

  // 새로운 질문을 추가해 상태 업데이트
  const addQuestion = (newQuestion) => {
    setQuestionData((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

  return (
    <>
      <div>
        <img src={userData.imageSource} className="w-16 h-16 rounded-full" />
        <h2>{userData.name}</h2>
      </div>
      <QuestionList questionData={questionData} />
      <QuestionModal userData={userData} onQuestionSubmitted={addQuestion} />
    </>
  );
}

export default QuestionPage;
