import { useState, useEffect } from 'react';
import { getUsetData } from '../../api/api';
import QuestionModal from '../../components/QuestionModal';

function QuestionPage() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API를 호출해 이름 가져옴
    async function fetchName() {
      try {
        const userDatas = await getUsetData(5637);
        setUserData(userDatas);
      } catch (error) {
        console.error('Failed to fetch datas:', error);
      }
    }
    fetchName();
  }, []);

  return (
    <>
      <div>
        <img src={userData.imageSource} className="w-16 h-16 rounded-full" />
        <h2>{userData.name}</h2>
      </div>
      <QuestionModal userData={userData} />
    </>
  );
}

export default QuestionPage;
