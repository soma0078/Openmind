import { useEffect, useState } from 'react';
import {
  deleteAnswer,
  deleteQuestion,
  rejectedUpdate,
  submitAnswers,
} from '../../../api/api';
import { updateButtonText } from '../../../utils/utils';
import editButton from '../../../assets/icon-edit.svg';
import closeButton from '../../../assets/icon-close.svg';
import rejectionButton from '../../../assets/icon-rejection.svg';
import editButtonBlue from '../../../assets/icon-edit-blue.svg';
import closeButtonBlue from '../../../assets/icon-close-blue.svg';
import rejectionButtonBlue from '../../../assets/icon-rejection-blue.svg';

function KebabModal({ question, handleDataChange, toggleMenu }) {
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverDeleteAnswer, setHoverDeleteAnswer] = useState(false);
  const [hoverRejection, setHoverRejection] = useState(false);
  const [hoverDeleteQuestion, setHoverDeleteQuestion] = useState(false);
  const [editButtonText, setEditButtonText] = useState('답변 수정하기');
  const [closeAnswerButtonText, setCloseAnswerButtonText] =
    useState('답변 삭제하기');
  const [rejectButtonText, setRejectionButtonText] = useState('답변 거절하기');
  const [closeQuestionButtonText, setCloseQuestionButtonText] =
    useState('질문 삭제하기');
  const questionId = question.id;

  async function handleDeleteAnswer() {
    try {
      await deleteAnswer(question.answer.id);
    } catch (error) {
      console.log('답변 삭제 중 오류가 발생했습니다:', error);
    }
    window.location.reload();
  }

  async function handleDeleteQuestion() {
    try {
      await deleteQuestion(question.id);
    } catch (error) {
      console.log('질문 삭제 중 오류가 발생했습니다:', error);
    }
    window.location.reload();
  }

  async function handleRejectedAnswer() {
    try {
      if (question.answer === null) {
        //답변이 없다면 거절된 답변으로 변경
        const string = '거절된 답변입니다.';
        await submitAnswers(questionId, string, true);
        console.log('답변이 성공적으로 거절되었습니다');
      } else if (question.answer.isRejected === true) {
        //이미 거절된 답변이면
        console.log('이미 거절된 답변입니다.');
      } else {
        //거절이 아닌 답변이었다면
        await rejectedUpdate(question.answer.id);
        console.log('답변이 성공적으로 거절되었습니다');
      }
    } catch (error) {
      console.log('답변 거절 중 오류가 발생했습니다:', error);
    }
    window.location.reload();
  }

  useEffect(() => {
    // 페이지 로드시 한 번 실행
    updateButtonText(setEditButtonText, '답변 수정', '답변 수정하기');
    updateButtonText(setCloseAnswerButtonText, '답변 삭제', '답변 삭제하기');
    updateButtonText(setRejectionButtonText, '답변  거절', '답변 거절하기');
    updateButtonText(setCloseQuestionButtonText, '질문 삭제', '질문 삭제하기');

    // 윈도우 사이즈 변경마다 실행
    window.addEventListener('resize', () => {
      updateButtonText(setEditButtonText, '답변 수정', '답변 수정하기');
      updateButtonText(setCloseAnswerButtonText, '답변 삭제', '답변 삭제하기');
      updateButtonText(setRejectionButtonText, '답변 거절', '답변 거절하기');
      updateButtonText(
        setCloseQuestionButtonText,
        '질문 삭제',
        '질문 삭제하기',
      );
    });

    // Clean up
    return () =>
      window.removeEventListener('resize', () => {
        updateButtonText(setEditButtonText, '답변 수정', '답변 수정하기');
        updateButtonText(
          setCloseAnswerButtonText,
          '답변 삭제',
          '답변 삭제하기',
        );
        updateButtonText(setRejectionButtonText, '답변 거절', '답변 거절하기');
        updateButtonText(
          setCloseAnswerButtonText,
          '질문 삭제',
          '질문 삭제하기',
        );
      });
  }, []);

  return (
    <div className="block text-sm font-medium absolute right-0 mt-2 w-[130px] bg-white shadow-lg rounded-lg">
      <div
        className="flex items-center justify-between py-1 px-7 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-medium tablet-1:py-2 tablet-1:px-4"
        onClick={() => {
          if (question.answer === null) {
            alert('수정할 대상이 아닙니다.');
            handleDataChange(false);
            toggleMenu();
          } else {
            handleDataChange(true);
            toggleMenu();
          }
        }}
        aria-label="답변 수정하기 버튼"
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoverEdit(true);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setHoverEdit(false);
        }}
      >
        <img
          className="flex w-3 h-3 tablet-1:w-4 tablet-1:h-4"
          src={hoverEdit ? editButtonBlue : editButton}
          alt="버튼"
        />
        <span className="flex">{editButtonText}</span>
      </div>
      <div
        className="flex items-center justify-between py-1 px-7 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-medium tablet-1:py-2 tablet-1:px-4"
        onClick={() => {
          if (question.answer === null) {
            alert('삭제할 답변이 없습니다.');
            toggleMenu();
          } else {
            handleDeleteAnswer();
            toggleMenu();
          }
        }}
        aria-label="답변 삭제하기 버튼"
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoverDeleteAnswer(true);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setHoverDeleteAnswer(false);
        }}
      >
        <img
          className="flex w-3 h-3 tablet-1:w-4 tablet-1:h-4"
          src={hoverDeleteAnswer ? closeButtonBlue : closeButton}
          alt="버튼"
        ></img>
        <span className="flex">{closeAnswerButtonText}</span>
      </div>
      <div
        className="flex items-center justify-between py-1 px-7 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-medium tablet-1:py-2 tablet-1:px-4"
        onClick={() => {
          if (question.answer === null) {
            handleRejectedAnswer();
            toggleMenu();
          } else if (question.answer.isRejected === true) {
            alert('이미 거절된 답변입니다.');
            toggleMenu();
          } else {
            alert('답변이 있어 거절할 수 없습니다.');
            toggleMenu();
          }
        }}
        aria-label="답변 거절하기 버튼"
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoverRejection(true);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setHoverRejection(false);
        }}
      >
        <img
          className="flex w-3 h-3 tablet-1:w-4 tablet-1:h-4"
          src={hoverRejection ? rejectionButtonBlue : rejectionButton}
          alt="버튼"
        ></img>
        <span className="flex">{rejectButtonText}</span>
      </div>
      <div
        className="flex items-center justify-between py-1 px-7 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-medium tablet-1:py-2 tablet-1:px-4"
        onClick={() => {
          handleDeleteQuestion();
          toggleMenu();
        }}
        aria-label="질문 삭제하기 버튼"
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoverDeleteQuestion(true);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setHoverDeleteQuestion(false);
        }}
      >
        <img
          className="flex w-3 h-3 tablet-1:w-4 tablet-1:h-4"
          src={hoverDeleteQuestion ? closeButtonBlue : closeButton}
          alt="버튼"
        ></img>
        <span className="flex">{closeQuestionButtonText}</span>
      </div>
    </div>
  );
}

export default KebabModal;
