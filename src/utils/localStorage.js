export const setLocalStorage = (id, name) => {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ [id]: name }));
  } else {
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('user')),
        [id]: name,
      }),
    );
  }
};

//로컬스토리지에 아이디별, 질문글별 좋아요 체크
/* export const setLocalStorage = (userId, questionId, reaction, name) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  if (!user[userId]) {
    user[userId] = { name: name, reactions: { [questionId]: reaction } };
  } else {
    if (!user[userId].reactions) {
      user[userId].reactions = { [questionId]: reaction };
    } else {
      if (user[userId].reactions[questionId]) {
        alert('이미 반응을 선택하셨습니다.');
        return;
      }
      user[userId].reactions[questionId] = reaction;
    }
    if (name) {
      user[userId].name = name;
    }
  }

  localStorage.setItem('user', JSON.stringify(user));
}; */
