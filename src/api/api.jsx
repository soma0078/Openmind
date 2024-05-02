const BASE_URL = "https://openmind-api.vercel.app/6-13";

// 호출하는 값에 따라 api 불러오기
export async function getSubjects(endpoint, params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    console.log("body");
    console.log(body);
    return body;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}
