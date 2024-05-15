export const setReactionStorage = (id, reactionType) => {
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  if (reactionType) {
    const reactionKey = `${id}-${reactionType}`;
    if (userData[reactionKey]) {
      return false;
    }
    userData[reactionKey] = '1';
  }

  localStorage.setItem('user', JSON.stringify(userData));
  return true;
};

// id 로컬스토리지에 저장하는 함수
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
