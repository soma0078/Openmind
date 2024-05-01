const BASE_URL = 'https://openmind-api.vercel.app/6-13';

// 질문카드 불러오기
export async function getSubjects(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `${BASE_URL}/subjects/?${query}`
    );
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
