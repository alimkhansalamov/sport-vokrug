import React from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import TimeDisplay from './components/TimeDisplay/TimeDisplay';
import EventCard from './components/EventCard/EventCard';
import styles from './App.module.scss';

const AppContent: React.FC = () => {
    const { currentEvent, nextEvent } = useEventContext();

    const isOnlyTimeDisplay = !currentEvent && !nextEvent;

    return (
        <div className={isOnlyTimeDisplay ? styles.centeredApp : styles.app}>
            {isOnlyTimeDisplay ? (
                <TimeDisplay noEvents={true} />
            ) : (
                <>
                    <div className={styles.top}>
                        <TimeDisplay noEvents={false} />
                    </div>

                    <div className={styles.middle}>
                        {currentEvent ? (
                            <EventCard event={currentEvent} isCurrent={true} showTimer={true} hasBackground={true} />
                        ) : (
                            <div className={styles.emptySection}></div>
                        )}
                    </div>

                    <div className={styles.bottom}>
                        {nextEvent ? (
                            <EventCard event={nextEvent} isCurrent={false} showTimer={false} hasBackground={false} />
                        ) : (
                            <div className={styles.emptySection}></div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <EventProvider>
            <AppContent />
        </EventProvider>
    );
};

export default App;
