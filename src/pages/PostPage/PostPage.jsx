import React, { useEffect, useState } from 'react';
import logoImage from '../../assets/img-logo.png';
import emptyImage from '../../assets/img-no-questions-asked.png';
import messageImage from '../../assets/icon-messages.svg';
import QuestionCard from './components/QuestionCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Share from './components/Share';

function PostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(null);

  const nav = useNavigate();

  const onMoveBack = () => {
    nav(-1);
  };

  const popUpModal = () => {
   // 내용 작성
  };

  const BASE_URL = 'https://openmind-api.vercel.app/6-13';
  const getSubject = async (id) => {
    const subject = await fetch(`${BASE_URL}/subjects/${id}/`);
    return subject.json();
  };

  const getSubjectProfile = async (id) => {
    const subject = await getSubject(id);
    setSubject(subject)
    setLoading(false);
  };

  // 피드 삭제 버튼 (개선작업중, 안 되면 기능 삭제)
  const deleteSubject = async (id) => {
    const subject = await fetch(`${BASE_URL}/subjects/${id}/`, {
      method: 'DELETE',
    });
    return subject.json();
  };

  const deleteSubjectCard = async (id) => {
    const subjectCard = await deleteSubject(id);
    setSubject(subjectCard)
  }

  useEffect(() => {
    getSubjectProfile(postId)
  }, [postId]);

  if (loading) return null;

  return (
    <div className='flex flex-col h-[234px]'>
      <div className='bg-[#F9F9F9] bg-main1 bg-contain bg-no-repeat'>
        <div className='pt-[50px] gap-[20px] flex flex-col items-center justify-center'>
          <Link to='/'>
            <img className='w-[170px] h-[67px]' src={logoImage} alt="로고 이미지" />
          </Link>
          <img className='w-[136px] h-[136px] rounded-full' src={subject.imageSource} alt={subject.name} />
          <div className='relative'>
            <h2 className='font-[400] text-[32px] text-[#000000]'>{subject.name}</h2>
            <button className='absolute -top-[40%] left-[80%] w-[100px] rounded-[200px] font-[400] text-[#542F1A] bg-[#C7BBB5]' onClick={deleteSubjectCard}>프로필 삭제</button>
          </div>
          <Share />
        </div>
      </div>
      <div className='flex justify-center pt-[30px] pb-[80px] bg-[#F9F9F9]'>
        <div className='flex flex-col items-center w-[716px] p-[16px] border-[1px] border-[#C7BBB5] rounded-[16px] gap-[18px] bg-[#F5F1EE]'>
          <div className='flex items-center gap-[8px]'>
            {subject.questionCardCount === 0 ? (
              <div className='flex flex-col items-center gap-2 w-[716px] h-[330px]'>
                <div className='flex justify-center gap-2'>
                  <img className='w-[24px] h-[24px]' src={messageImage} alt="메시지 이모티콘" />
                  <span className='font-[400] text-[20px] text-[#542F1A]'>아직 질문이 없습니다.</span>
                </div>
                <img className='w-[150px] h-[154px] translate-y-[30%]' src={emptyImage} alt="비어있는 상태 이미지" />
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-center gap-2'>
                  <img className='w-[24px] h-[24px]' src={messageImage} alt="메시지 이모티콘" />
                  <span className='font-[400] text-[20px] text-[#542F1A]'>{subject.questionCount}개의 질문이 있습니다.</span>
                </div>
                <QuestionCard isAskPage />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='relative flex justify-between bottom-[80px] px-[30px]'>
        <button className='rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]' onClick={onMoveBack}>뒤로 가기</button>
        <button className='rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]' onClick={popUpModal}>질문 작성하기</button>
      </div>
    </div>
  );
}

export default PostPage;