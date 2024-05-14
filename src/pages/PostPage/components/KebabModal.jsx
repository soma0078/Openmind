import {
  deleteAnswer,
  deleteQuestion,
  rejectedUpdate,
  submitAnswers,
} from '../../../api/api';
import editButton from '../../../assets/icon-edit.svg';
import closeButton from '../../../assets/icon-close.svg';
import rejectionButton from '../../../assets/icon-rejection.svg';
import editButtonBlue from '../../../assets/icon-edit-blue.svg';
import closeButtonBlue from '../../../assets/icon-close-blue.svg';
import rejectionButtonBlue from '../../../assets/icon-rejection-blue.svg';
import { useState } from 'react';

function KebabModal({ question, handleDataChange, toggleMenu }) {
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverDeleteAnswer, setHoverDeleteAnswer] = useState(false);
  const [hoverRejection, setHoverRejection] = useState(false);
  const [hoverDeleteQuestion, setHoverDeleteQuestion] = useState(false);
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

  return (
    <div className="block text-[14px] text-[600] absolute right-0 mt-2 w-[130px] bg-white shadow-lg rounded-lg">
      <div
        className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-[500]"
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
          className="flex w-[14px] h-[14px]"
          src={hoverEdit ? editButtonBlue : editButton}
          alt="버튼"
        />
        <span className="flex">답변 수정하기</span>
      </div>
      <div
        className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer  hover:text-[var(--Blue-50)] hover:font-[500]"
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
          className="flex w-[14px] h-[14px]"
          src={hoverDeleteAnswer ? closeButtonBlue : closeButton}
          alt="버튼"
        ></img>
        <span className="flex">답변 삭제하기</span>
      </div>
      <div
        className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-[500]"
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
          className="flex w-[14px] h-[14px]"
          src={hoverRejection ? rejectionButtonBlue : rejectionButton}
          alt="버튼"
        ></img>
        <span className="flex">답변 거절하기</span>
      </div>
      <div
        className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer hover:text-[var(--Blue-50)] hover:font-[500]"
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
          className="flex w-[14px] h-[14px]"
          src={hoverDeleteQuestion ? closeButtonBlue : closeButton}
          alt="버튼"
        ></img>
        <span className="flex">질문 삭제하기</span>
      </div>
    </div>
  );
}

export default KebabModal;
