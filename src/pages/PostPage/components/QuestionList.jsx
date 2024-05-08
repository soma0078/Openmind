import React from 'react';
import QuestionCard from './QuestionCard';

function QuestionList({ questionData }) {
  if (!questionData || !questionData.length === 0) {
    return <div>No questions to display</div>; // 질문이 없는 경우 메시지를 출력하거나 아무것도 렌더링하지 않습니다.
  }
  return (
    <div>
      <ul>
        {questionData.map((question) => (
          <li key={question.id}>
            <QuestionCard question={question} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
