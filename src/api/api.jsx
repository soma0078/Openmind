const BASE_URL = "https://openmind-api.vercel.app/6-13";

export async function getQuestions(order = {}) {
  const query = new URLSearchParams(order).toString();

  try {
    const response = await fetch(`${BASE_URL}/answers/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
