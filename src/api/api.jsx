// 주어진 ID를 사용해 사용자 데이터를 가져오는 함수
export async function getUsetData(id) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/6-13/subjects/${id}/`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch subject id:', error);
    throw error;
  }
}

// 모달창에서 사용자가 입력한 질문을 서버로 전송하는 함수
export async function submitQuestion(id, questionContent) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/6-13/subjects/${id}/questions/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: questionContent }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    console.log('질문이 성공적으로 전송되었습니다.');
    const submittedQuestion = await response.json();
    return submittedQuestion;
  } catch (error) {
    console.error('질문 전송에 실패했습니다. ', error);
    throw error;
  }
}

// 주어진 ID를 사용해 질문 데이터를 가져오는 함수
export async function getQuestionsByUserId(id) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/6-13/subjects/${id}/questions/`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const questionData = await response.json();
    return questionData.results;
  } catch (error) {
    console.error('질문을 불러오는데 실패했습니다.', error);
    throw error;
  }
}

// 사용자 데이터를 기반으로 질문 데이터를 가져와 상태를 설정하는 함수
export async function fetchQuestionsByUser(userData, setQuestionData) {
  try {
    if (!userData || !userData.id) {
      console.error('사용자 데이터 또는 사용자 ID를 가져올 수 없습니다.');
      return;
    }
    const questionsData = await getQuestionsByUserId(userData.id);
    setQuestionData(questionsData);
  } catch (error) {
    console.error('질문을 불러오는데 실패했습니다.', error);
  }
}
