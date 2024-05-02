import React from "react";
import AnswersForm from "./AnswersForm";

function QuestionsList({ question, answer }) {
  if (!question) return null;

  return (
    <div className="qna-container">
      <h3>질문: {question}</h3>
      <p>답변: {answer ? <div>{answer}</div> : <AnswersForm />}</p>
    </div>
  );
}

export default QuestionsList;
