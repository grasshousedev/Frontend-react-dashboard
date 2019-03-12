import React from 'react';
import PropTypes from 'prop-types';

export function Timeline({ events }) {
    return <div className="ui-timeline__container">
        {events.map((event, index) => {
            const titleContainerExtraClass = index === 0
                ? 'ui-timeline__title__container--first'
                : index === events.length - 1
                    ? 'ui-timeline__title__container--last'
                    : '';
            return <div className="ui-timeline__event" key={`ui-timeline-event-${index}`}>
                <div className={`ui-timeline__title__container ${titleContainerExtraClass}`}>
                    <div className="ui-timeline__title">{event.title}</div>
                    {event.description && <div className="ui-timeline__description">{event.description}</div>}
                </div>
                <div className="ui-timeline__content">{event.content}</div>
            </div>;
        })}
    </div>;
}

Timeline.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        })
    )
};

