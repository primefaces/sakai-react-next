import React, { useState } from 'react';

export const MenuContext = React.createContext();

export const MenuProvider = (props) => {
    const [contextKey, setContextKey] = useState('');
    const [routeEvent, setRouteEvent] = useState(false);
    const onMenuStateChange = ({ key, routeEvent }) => {
        setKey(key);
        setRouteEvent(routeEvent);
    };

    const value = {
        contextKey,
        routeEvent,
        onMenuStateChange
    };

    return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};
