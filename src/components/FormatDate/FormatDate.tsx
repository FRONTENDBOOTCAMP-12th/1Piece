function FormatDateToKST(dateString?: string): string {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '잘못된 날짜';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);
}

export default FormatDateToKST;
