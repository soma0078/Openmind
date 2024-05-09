import moreImage from '../../../assets/icon-more.svg';
import { deleteAnswer } from '../../../api/api';

function KebabButton({ question, userData }) {
  const answerId = question.subjectId;
  const OptionType = [{ label: '수정하기' }, { label: '삭제하기' }];
  console.log('------------------33');
  console.log(question);
  console.log(userData);
  console.log('------------------33');

  const handleDelete = async () => {
    try {
      const answerIdDelete = await deleteAnswer(answerId);
      console.log('답변이 성공적으로 삭제되었습니다:', answerIdDelete);
    } catch (error) {
      console.log('답변 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <img
      src={moreImage}
      alt="더보기 버튼"
      className="flex w-[26px] h-[26px]"
    ></img>
  );
}

export default KebabButton;
