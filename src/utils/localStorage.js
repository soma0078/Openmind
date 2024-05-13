export const setLocalStorage = (id, name, reactionType) => {
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  // 기존의 로직 대체
  userData[id] = name;
  // if (!localStorage.getItem('user')) {
  //   localStorage.setItem('user', JSON.stringify({ [id]: name }));
  // } else {
  //   localStorage.setItem(
  //     'user',
  //     JSON.stringify({
  //       ...JSON.parse(localStorage.getItem('user')),
  //       [id]: name,
  //     }),
  //   );
  // }

  // 리액션 추적
  if (reactionType) {
    const reactionKey = `${id}-${reactionType}`;
    if (userData[reactionKey]) {
      return false;
    }
    userData[reactionKey] = '1';
  }

  userData[id] = name;
  localStorage.setItem('user', JSON.stringify(userData));
  return true;
};
