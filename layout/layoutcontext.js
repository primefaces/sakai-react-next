import React, { useState, useEffect } from "react";
import PrimeReact from "primereact/api";

export const LayoutContext = React.createContext();

function LayoutProvider({ children }) {
    const [layoutState, setLayoutState] = useState({
        layoutColorMode: "light",
        layoutMode: "static",
        inputStyle: "outlined",
        ripple: true,
    });
    const [layoutConfig, setLayoutConfig] = useState({
        staticMenuInactive: false,
        overlayMenuActive: false,
        mobileMenuActive: false,
        mobileTopbarMenuActive: false,
    });

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (layoutConfig.mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [layoutConfig.mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setLayoutState((prevState) => ({
            ...prevState,
            inputStyle: inputStyle,
        }));
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setLayoutState((prevState) => ({
            ...prevState,
            ripple: e.value,
        }));
    };

    const onLayoutModeChange = (mode) => {
        setLayoutState((prevState) => ({
            ...prevState,
            layoutMode: mode,
        }));
    };

    const onColorModeChange = (mode) => {
        setLayoutState((prevState) => ({
            ...prevState,
            layoutColorMode: mode,
        }));
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setLayoutConfig((prevState) => ({
                ...prevState,
                overlayMenuActive: false,
                mobileMenuActive: false,
            }));
        }

        if (!mobileTopbarMenuClick) {
            setLayoutConfig((prevState) => ({
                ...prevState,
                mobileTopbarMenuActive: false,
            }));
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutState.layoutMode === "overlay") {
                if (layoutConfig.mobileMenuActive === true) {
                    setLayoutConfig((prevState) => ({
                        ...prevState,
                        overlayMenuActive: true,
                    }));
                }
                setLayoutConfig((prevState) => ({
                    ...prevState,
                    overlayMenuActive: !prevState.overlayMenuActive,
                    mobileMenuActive: false,
                }));
            } else if (layoutState.layoutMode === "static") {
                setLayoutConfig((prevState) => ({
                    ...prevState,
                    staticMenuInactive: !prevState.staticMenuInactive,
                }));
            }
        } else {
            setLayoutConfig((prevState) => ({
                ...prevState,
                mobileMenuActive: !prevState.mobileMenuActive,
            }));
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setLayoutConfig((prevState) => ({
            ...prevState,
            mobileMenuActive: !prevState.mobileMenuActive,
        }));
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setLayoutConfig((prevState) => ({
                ...prevState,
                overlayMenuActive: false,
                mobileMenuActive: false,
            }));
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onInputStyleChange,
        onRipple,
        onLayoutModeChange,
        onColorModeChange,
        onWrapperClick,
        onToggleMenuClick,
        onSidebarClick,
        onMobileTopbarMenuClick,
        onMobileSubTopbarMenuClick,
        onMenuItemClick,
    };
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export default LayoutProvider;
