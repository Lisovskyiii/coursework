export const toFormatDate = (date: Date) => {
  const formattedDate = date
    .toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '.'); // Заменяем слеши на точки (если нужно)

  return formattedDate;
};

export const toFormatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 т.к. месяцы 0-11
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  // "2025-03-27"

  return formattedDate;
};

export function formatDateToDMY(isoDate: string) {
  const [year, month, day] = isoDate.split('-');

  return `${day}.${month}.${year}`;
}

export function toFormatRangeInput() {
  const today = new Date();

  const monday = new Date(today);

  monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

  // Вычисляем воскресенье текущей недели
  const sunday = new Date(monday);

  sunday.setDate(monday.getDate() + 6);

  // Форматируем даты в формат YYYY-MM-DD (для input type="date")
  const formatDate = (date: any) => date.toISOString().split('T')[0];

  return { monday: formatDate(monday), sunday: formatDate(sunday) };
}
