// 주어진 날짜와 현재 날짜 간의 차이를 계산
export function formatDateAge(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - date.getTime();

  // 날짜만을 기준으로 일 수 계산
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 오늘과 주어진 날짜가 같은 경우
  if (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  ) {
    return '오늘';
  }

  // 오늘의 시간을 기준으로 계산된 일 수가 0이 아니면 1일을 더해줌
  const daysOffset = 1;

  // 실제 날짜 차이를 계산
  const actualDiffDays = diffDays + daysOffset;

  if (actualDiffDays === 1) {
    return '1일 전';
  } else if (actualDiffDays < 7) {
    return `${actualDiffDays}일 전`;
  } else if (actualDiffDays < 14) {
    return '1주 전';
  } else {
    const diffWeeks = Math.floor(actualDiffDays / 7);
    return `${diffWeeks}주 전`;
  }
}

// 윈도우 너비에 따라 버튼 텍스트 업데이트
export const updateButtonText = (setButtonText, shortText, longText) => {
  const windowWidth = window.innerWidth;
  setButtonText(windowWidth < 768 ? shortText : longText);
};
