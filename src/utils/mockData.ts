import { Event } from '../types/Event';

// Функция для добавления дней к дате и установки времени на полночь
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(0, 0, 0, 0); // Время на полночь
  return result;
};

export const mockEvents: Event[] = [

  // Сценарий 1: Нет мероприятий
  // []

  // Сценарий 2: Текущее мероприятие (идет сейчас)
  // {
  //   title: 'Текущее мероприятие',
  //   is_main: false,
  //   dt_start: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Началось час назад
  //   dt_end: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),   // Закончится через час
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 3: Ближайшее мероприятие
  // {
  //   title: 'Ближайшее мероприятие',
  //   is_main: false,
  //   dt_start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // Начнется через час
  //   dt_end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),   // Закончится через 2 часа
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 4: Следующее мероприятие
  {
    title: 'Следующее мероприятие',
    is_main: false,
    dt_start: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // Начнется через 3 часа
    dt_end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),   // Закончится через 4 часа
    dt_create: new Date().toISOString(),
  },

  // Сценарий 5: Ключевое мероприятие
  {
    title: 'Ключевое мероприятие',
    is_main: true,
    dt_start: addDays(new Date(), 1).toISOString(), // Начнется через 1 день
    dt_end: addDays(new Date(), 2).toISOString(),   // Закончится через 2 дня
    dt_create: new Date().toISOString(),
  },

  // Сценарий 6: Мероприятие в один день
  // {
  //   title: 'Мероприятие в один день',
  //   is_main: false,
  //   dt_start: addDays(new Date(), 1).toISOString(), // Завтра
  //   dt_end: addDays(new Date(), 1).toISOString(),   // Завтра
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 7: Мероприятие в пределах одного месяца
  // {
  //   title: 'Мероприятие в пределах одного месяца',
  //   is_main: false,
  //   dt_start: addDays(new Date(), 2).toISOString(),
  //   dt_end: addDays(new Date(), 5).toISOString(),
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 8: Мероприятие в пределах одного года (в разных месяцах)
  // {
  //   title: 'Мероприятие в пределах одного года',
  //   is_main: false,
  //   dt_start: new Date(new Date().getFullYear(), new Date().getMonth(), 31, 0, 0, 0).toISOString(), // 31-е число текущего месяца
  //   dt_end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2, 0, 0, 0).toISOString(), // 2-е число следующего месяца
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 9: Мероприятие в разных годах
  // {
  //   title: 'Мероприятие в разных годах',
  //   is_main: false,
  //   dt_start: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0).toISOString(), // 31 декабря текущего года
  //   dt_end: new Date(new Date().getFullYear() + 1, 0, 2, 0, 0, 0).toISOString(), // 2 января следующего года
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 10: Длинное название мероприятия
  // {
  //   title: 'Очень длинное название мероприятия, которое не помещается в одну строку и должно быть обрезано после второй строки с троеточием.Очень длинное название мероприятия, которое не помещается в одну строку и должно быть обрезано после второй строки с троеточием.Очень длинное название мероприятия, которое не помещается в одну строку и должно быть обрезано после второй строки с троеточием.',
  //   is_main: false,
  //   dt_start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
  //   dt_end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 11: Мероприятие через 12 дней (для тестирования таймера)
  {
    title: 'Мероприятие через 12 дней',
    is_main: false,
    dt_start: addDays(new Date(), 14).toISOString(),
    dt_end: addDays(new Date(), 15).toISOString(),
    dt_create: new Date().toISOString(),
  },

// Сценарий 12: Мероприятие через 15 дней (для тестирования таймера)
  // {
  //   title: 'Мероприятие через 15 дней',
  //   is_main: false,
  //   dt_start: addDays(new Date(), 15).toISOString(),
  //   dt_end: addDays(new Date(), 16).toISOString(),
  //   dt_create: new Date().toISOString(),
  // },

  // Сценарий 13: Мероприятие через 12 дней (для тестирования таймера)
  // {
  //   title: 'Мероприятие через 20 дней',
  //   is_main: false,
  //   dt_start: addDays(new Date(), 20).toISOString(),
  //   dt_end: addDays(new Date(), 21).toISOString(),
  //   dt_create: new Date().toISOString(),
  // },
];
