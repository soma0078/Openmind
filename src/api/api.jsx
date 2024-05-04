const BASE_URL = "https://openmind-api.vercel.app/6-13";

// 질문카드 불러오기
export async function getSubjects(params = {}) {
  // 현재 네트워크 request url 예시
  // BASE_URL/subjects/?sort=createdAt&limit=8
  // 페이지네이션 작업 시, 필요한 params를 더 추가하면 될 것 같습니다

  // limit: 몇 개 받을 것인지
  // offset: 몇 번부터 받을 것인지
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${BASE_URL}/subjects/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    console.log("body");
    console.log(body);
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

// 질문카드 생성
export const createQuestionCard = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        team: "13",
      }),
    });

    if (response.ok) return response.json();
    return new Error("");
  } catch (e) {
    if (e instanceof Error) return e;
  }
};
