import AnswersForm from "./component/AnswersForm";
import QuestionsList from "./component/QuestionsList";

function PostPage() {
  return (
    <>
      <div>아초는고양이</div>
      <div>3개의 질문이 있습니다.</div>
      <QuestionsList />
      <AnswersForm />
    </>
  );
}

export default PostPage;
