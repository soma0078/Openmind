import React from 'react';
import QuestionContent from './QuestionContent';

function QuestionList({ questionData }) {
  return (
    <div>
      <ul>
        {questionData.map((question, id) => (
          <li key={id}>
            <QuestionContent content={question.content} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
