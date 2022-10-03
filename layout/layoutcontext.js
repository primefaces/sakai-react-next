import React, { useState, useEffect, useRef } from 'react';
import PrimeReact from 'primereact/api';

export const LayoutContext = React.createContext();

function LayoutProvider({ children }) {
    const [layoutState, setLayoutState] = useState({
        layoutColorMode: 'light',
        layoutMode: 'static',
        inputStyle: 'outlined',
        ripple: true
    });
    const [layoutConfig, setLayoutConfig] = useState({
        staticMenuInactive: false,
        overlayMenuActive: false,
        mobileMenuActive: false,
        mobileTopbarMenuActive: false
    });

    useEffect(() => {
        if (layoutConfig.mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        } else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [layoutConfig.mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setLayoutState((prevState) => ({
            ...prevState,
            inputStyle: inputStyle
        }));
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setLayoutState((prevState) => ({
            ...prevState,
            ripple: e.value
        }));
    };

    const onLayoutModeChange = (mode) => {
        setLayoutState((prevState) => ({
            ...prevState,
            layoutMode: mode
        }));
    };

    const onColorModeChange = (mode) => {
        setLayoutState((prevState) => ({
            ...prevState,
            layoutColorMode: mode
        }));
    };

    const hideMenu = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            overlayMenuActive: false,
            mobileMenuActive: false
        }));
    };

    const hideProfileMenu = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            mobileTopbarMenuActive: false
        }));
    };

    const onToggleMenuClick = (event) => {
        if (isDesktop()) {
            if (layoutState.layoutMode === 'overlay') {
                if (layoutConfig.mobileMenuActive === true) {
                    setLayoutConfig((prevState) => ({
                        ...prevState,
                        overlayMenuActive: true
                    }));
                }
                setLayoutConfig((prevState) => ({
                    ...prevState,
                    overlayMenuActive: !prevState.overlayMenuActive,
                    mobileMenuActive: false
                }));
            } else if (layoutState.layoutMode === 'static') {
                setLayoutConfig((prevState) => ({
                    ...prevState,
                    staticMenuInactive: !prevState.staticMenuInactive
                }));
            }
        } else {
            setLayoutConfig((prevState) => ({
                ...prevState,
                mobileMenuActive: !prevState.mobileMenuActive
            }));
        }

        event.preventDefault();
    };

    const onMobileTopbarMenuClick = (event) => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            mobileTopbarMenuActive: !prevState.mobileTopbarMenuActive
        }));
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            mobileTopbarMenuActive: true
        }));

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setLayoutConfig((prevState) => ({
                ...prevState,
                overlayMenuActive: false,
                mobileMenuActive: false
            }));
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += ' ' + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        hideMenu,
        hideProfileMenu,
        onInputStyleChange,
        onRipple,
        onLayoutModeChange,
        onColorModeChange,
        onToggleMenuClick,
        onMobileTopbarMenuClick,
        onMobileSubTopbarMenuClick,
        onMenuItemClick
    };
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export default LayoutProvider;
