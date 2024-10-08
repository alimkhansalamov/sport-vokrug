export const formatEventDate = (start: string, end: string): string => {
  const dtStart = new Date(start);
  const dtEnd = new Date(end);

  const sameDay = dtStart.toDateString() === dtEnd.toDateString();
  const sameMonth =
    dtStart.getMonth() === dtEnd.getMonth() && dtStart.getFullYear() === dtEnd.getFullYear();
  const sameYear = dtStart.getFullYear() === dtEnd.getFullYear();

  const optionsFull: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const optionsDayMonth: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };

  if (sameDay) {
    // ДД.MM.ГГГГ
    return dtStart.toLocaleDateString('ru-RU', optionsFull);
  } else if (sameMonth) {
    // ДД–ДД.MM.ГГГГ
    const dayStart = dtStart.getDate().toString().padStart(2, '0');
    const dayEnd = dtEnd.getDate().toString().padStart(2, '0');
    const monthYear = dtStart.toLocaleDateString('ru-RU', { month: '2-digit', year: 'numeric' });
    return `${dayStart}–${dayEnd}.${monthYear}`;
  } else if (sameYear) {
    // ДД.MM–ДД.MM.ГГГГ
    const startDate = dtStart.toLocaleDateString('ru-RU', optionsDayMonth);
    const endDate = dtEnd.toLocaleDateString('ru-RU', optionsDayMonth);
    const year = dtStart.getFullYear();
    return `${startDate}–${endDate}.${year}`;
  } else {
    // ДД.MM.ГГГГ–ДД.MM.ГГГГ
    return `${dtStart.toLocaleDateString('ru-RU', optionsFull)}–${dtEnd.toLocaleDateString(
      'ru-RU',
      optionsFull
    )}`;
  }
};
