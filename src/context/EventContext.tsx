import React, { createContext, useContext, useEffect, useState } from 'react';
import { Event } from '../types/Event';
import client from './../graphql/client';
import { GET_EVENTS } from './../graphql/queries';

interface EventContextType {
  currentEvent: Event | null;
  isCurrentEvent: boolean;
  nextEvent: Event | null;
}

const EventContext = createContext<EventContextType>({
  currentEvent: null,
  isCurrentEvent: false,
  nextEvent: null,
});

export const useEventContext = () => useContext(EventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isCurrentEvent, setIsCurrentEvent] = useState<boolean>(false);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async (): Promise<Event[]> => {
      try {
        const { data } = await client.query({
          query: GET_EVENTS,
          variables: { videostand_id: '6' },
          fetchPolicy: 'no-cache',
        });
        return data.videostandEvents.current_and_upcoming;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    };

    const updateEvents = async () => {
      const events = await fetchEvents();
      if (isMounted) {
        processEvents(events);
      }
    };

    updateEvents();

    // Обновляем данные каждые 60 секунд
    const interval = setInterval(() => {
      updateEvents();
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const processEvents = (events: Event[]) => {
    const now = Date.now();

    // Преобразуем даты мероприятий в временные метки
    const eventsWithTimestamps = events.map(event => ({
      ...event,
      dt_start_ts: new Date(event.dt_start).getTime(),
      dt_end_ts: new Date(event.dt_end).getTime(),
    }));

    // Фильтрация прошедших мероприятий
    const upcomingEvents = eventsWithTimestamps.filter(event => event.dt_end_ts >= now);

    // Сортировка мероприятий по дате начала
    const sortedEvents = upcomingEvents.sort((a, b) => a.dt_start_ts - b.dt_start_ts);

    let currentEvent: Event | null = null;
    let isCurrentEvent = false;
    let nextEvent: Event | null = null;

    // Ключевое мероприятие
    const mainEvent = sortedEvents.find(event => event.is_main);

    if (mainEvent) {
      // Является ли ключевое мероприятие текущим
      isCurrentEvent = mainEvent.dt_start_ts <= now && mainEvent.dt_end_ts >= now;
      currentEvent = mainEvent;

      // Ближайшее мероприятие, исключая ключевое
      nextEvent = sortedEvents.find(
        event => event !== mainEvent && event.dt_end_ts >= now
      ) || null;
    } else {
      // Если нет ключевого мероприятия, ищем текущее или следующее мероприятие
      const ongoingEvent = sortedEvents.find(
          event => event.dt_start_ts <= now && event.dt_end_ts >= now
      );

      if (ongoingEvent) {
        // Если текущее мероприятие найдено
        isCurrentEvent = true;
        currentEvent = ongoingEvent;

        // Ищем следующее мероприятие после текущего
        nextEvent = sortedEvents.find(
            event => event.dt_start_ts > ongoingEvent.dt_end_ts
        ) || null;
      } else {
        // Если текущее мероприятие не найдено, ищем ближайшее будущее мероприятие
        const upcomingEvent = sortedEvents.find(event => event.dt_start_ts >= now);

        if (upcomingEvent) {
          isCurrentEvent = false;
          currentEvent = upcomingEvent;

          // Ищем следующее мероприятие после ближайшего
          nextEvent = sortedEvents.find(
              event => event.dt_start_ts > upcomingEvent.dt_end_ts
          ) || null;
        }
      }
    }

    setCurrentEvent(currentEvent);
    setIsCurrentEvent(isCurrentEvent);
    setNextEvent(nextEvent);
  };


  return (
    <EventContext.Provider value={{ currentEvent, isCurrentEvent, nextEvent }}>
      {children}
    </EventContext.Provider>
  );
};










//
// // FOR TESTING
//
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Event } from '../types/Event';
// import { mockEvents } from '../utils/mockData';
// // import client from './../graphql/client';
// // import { GET_EVENTS } from './../graphql/queries';
//
// interface EventContextType {
//   currentEvent: Event | null;
//   isCurrentEvent: boolean;
//   nextEvent: Event | null;
// }
//
// const EventContext = createContext<EventContextType>({
//   currentEvent: null,
//   isCurrentEvent: false,
//   nextEvent: null,
// });
//
// export const useEventContext = () => useContext(EventContext);
//
// export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
//   const [isCurrentEvent, setIsCurrentEvent] = useState<boolean>(false);
//   const [nextEvent, setNextEvent] = useState<Event | null>(null);
//
//
//   useEffect(() => {
//     const events = mockEvents;
//     processEvents(events);
//
//     // Обновление данных каждые 60 секунд для работы в "реальном времени"
//     const interval = setInterval(() => {
//       processEvents(events);
//     }, 60000);
//
//     return () => clearInterval(interval);
//   }, []);
//
//   const processEvents = (events: Event[]) => {
//     const now = Date.now();
//
//     // Преобразуем даты мероприятий в временные метки
//     const eventsWithTimestamps = events.map(event => ({
//       ...event,
//       dt_start_ts: new Date(event.dt_start).getTime(),
//       dt_end_ts: new Date(event.dt_end).getTime(),
//     }));
//
//     // Фильтруем прошедшие мероприятия
//     const upcomingEvents = eventsWithTimestamps.filter(event => event.dt_end_ts >= now);
//
//     // Сортируем мероприятия по дате начала
//     const sortedEvents = upcomingEvents.sort((a, b) => a.dt_start_ts - b.dt_start_ts);
//
//     let currentEvent: Event | null = null;
//     let isCurrentEvent = false;
//     let nextEvent: Event | null = null;
//
//     // Ищем ключевое мероприятие
//     const mainEvent = sortedEvents.find(event => event.is_main);
//
//     if (mainEvent) {
//       // Определяем, является ли ключевое мероприятие текущим
//       isCurrentEvent = mainEvent.dt_start_ts <= now && mainEvent.dt_end_ts >= now;
//       currentEvent = mainEvent;
//
//       // Ищем ближайшее мероприятие, исключая ключевое
//       nextEvent = sortedEvents.find(
//         event => event !== mainEvent && event.dt_start_ts >= now
//       ) || null;
//     } else {
//       // Ищем текущее мероприятие
//       const ongoingEvent = sortedEvents.find(
//         event => event.dt_start_ts <= now && event.dt_end_ts >= now
//       );
//
//       if (ongoingEvent) {
//         isCurrentEvent = true;
//         currentEvent = ongoingEvent;
//
//         // Ищем следующее мероприятие после текущего
//         nextEvent = sortedEvents.find(
//           event => event.dt_start_ts > ongoingEvent.dt_end_ts
//         ) || null;
//       } else {
//         // Ищем ближайшее мероприятие
//         const upcomingEvent = sortedEvents.find(event => event.dt_start_ts >= now);
//
//         if (upcomingEvent) {
//           isCurrentEvent = false;
//           currentEvent = upcomingEvent;
//
//           // Ищем следующее мероприятие после ближайшего
//           nextEvent = sortedEvents.find(
//             event => event.dt_start_ts > upcomingEvent.dt_end_ts
//           ) || null;
//         }
//       }
//     }
//
//     setCurrentEvent(currentEvent);
//     setIsCurrentEvent(isCurrentEvent);
//     setNextEvent(nextEvent);
//   };
//
//   return (
//     <EventContext.Provider value={{ currentEvent, isCurrentEvent, nextEvent }}>
//       {children}
//     </EventContext.Provider>
//   );
// };



