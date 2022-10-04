import React, { useState } from 'react';

export const LayoutContext = React.createContext();

export const LayoutProvider = (props) => {
    const [config, setConfig] = useState({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [state, setState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setState((prevState) => ({ ...prevState, overlayMenuActive: !prevState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setState((prevState) => ({ ...prevState, staticMenuDesktopInactive: !prevState.staticMenuDesktopInactive }));
        } else {
            setState((prevState) => ({ ...prevState, staticMenuMobileActive: !prevState.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setState((prevState) => ({ ...prevState, profileSidebarVisible: !prevState.profileSidebarVisible }));
    };

    const showConfigSidebar = () => {
        setState((prevState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const isOverlay = () => {
        return config.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        config,
        setConfig,
        state,
        setState,
        onMenuToggle,
        showProfileSidebar,
        showConfigSidebar
    };

    return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>;
};
