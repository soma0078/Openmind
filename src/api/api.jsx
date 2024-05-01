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
