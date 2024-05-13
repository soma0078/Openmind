import {
  deleteAnswer,
  deleteQuestion,
  rejectedUpdate,
  submitAnswers,
} from '../../../api/api';

function KebabModal({ question, handleDataChange, toggleMenu }) {
  const questionId = question.id;
  console.log(question);
  async function handleDeleteAnswer() {
    try {
      await deleteAnswer(question.answer.id);
    } catch (error) {
      console.log('답변 삭제 중 오류가 발생했습니다:', error);
    }
  }

  async function handleDeleteQuestion() {
    try {
      await deleteQuestion(question.id);
    } catch (error) {
      console.log('질문 삭제 중 오류가 발생했습니다:', error);
    }
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
  }

  return (
    <div className="block text-[14px] text-[600] absolute right-0 mt-2 w-[125px] bg-white shadow-lg rounded-lg">
      <div
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
      >
        답변 수정하기
      </div>
      <div
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          if (question.answer === null) {
            alert('삭제할 질문이 없습니다.');
            toggleMenu();
          } else {
            handleDeleteAnswer();
            toggleMenu();
          }
        }}
        aria-label="답변 삭제하기 버튼"
      >
        답변 삭제하기
      </div>
      <div
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          if (question.answer === null) {
            handleRejectedAnswer();
            toggleMenu();
          } else if (question.answer.isRejected === true) {
            alert('이미 거절된 답변입니다.');
            toggleMenu();
          }
        }}
        aria-label="답변 거절하기 버튼"
      >
        답변 거절하기
      </div>
      <div
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          handleDeleteQuestion();
          toggleMenu();
        }}
        aria-label="질문 삭제하기 버튼"
      >
        질문 삭제하기
      </div>
    </div>
  );
}

export default KebabModal;
