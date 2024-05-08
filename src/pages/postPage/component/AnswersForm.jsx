import React, { useState } from "react";
import { submitAnswers } from "../../../api/api";

function AnswersForm({ question }) {
  const [answerTitle, setAnswerTitle] = useState("");

  const addAnswer = async (e) => {
    try {
      const response = await submitAnswers(
        `${question.id}`,
        answerTitle,
        false
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // 서버로부터 응답을 받고 나면 입력 필드 초기화
      setAnswerTitle("");
    } catch (error) {
      console.error("답변 추가 중 에러 발생:", error);
    }
  };

  return (
    <>
      <form onSubmit={addAnswer}>
        <input
          type="text"
          value={answerTitle}
          onChange={(e) => setAnswerTitle(e.target.value)}
        />
        <button type="submit">등록하기</button>
      </form>
    </>
  );
}

export default AnswersForm;
