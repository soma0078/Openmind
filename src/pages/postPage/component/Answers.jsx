import React from "react";
import QuestionsList from "./QuestionsList";

const Answers = () => {
  return (
    <div>
      <QuestionsList question="임시 질문" answer="임시 답변" />
      <QuestionsList question="API 어렵다" answer="" />
    </div>
  );
};

export default Answers;
