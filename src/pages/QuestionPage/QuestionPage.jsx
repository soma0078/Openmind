import React, { useEffect, useState } from 'react';
import QuestionModal from './components/QuestionModal';
import QuestionList from './components/QuestionList';
import { fetchQuestionsByUser, getUserData } from '../../api/api';

function QuestionPage() {
  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    async function fetchName() {
      try {
        const userDatas = await getUserData(5777);
        setUserData(userDatas);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      }
    }
    fetchName();
  }, []);

  useEffect(() => {
    async function fetchQuestionsWrapper() {
      await fetchQuestionsByUser(userData, setQuestionData);
    }
    fetchQuestionsWrapper();
  }, [userData]);

  const addQuestion = (newQuestion) => {
    setQuestionData((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

  return (
    <>
      <div>
        <img src={userData.imageSource} className='w-16 h-16 rounded-full' alt="프로필 사진" />
        <h2>{userData.name}</h2>
      </div>
      <QuestionList questionData={questionData} />
      <QuestionModal userData={userData} onQuestionSubmitted={addQuestion} />
    </>
  )
}

export default QuestionPage;