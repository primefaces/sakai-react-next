import getConfig from 'next/config';
import Head from 'next/head';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { classNames, DomHandler } from 'primereact/utils';
import React, { useContext, useEffect, useRef } from 'react';
import ScrollToTop from '../demo/utils/ScrollToTop';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppTopbar from './AppTopbar';
import AppConfig from './config/AppConfig';
import { LayoutContext } from './context/layoutcontext';

const Layout = (props) => {
    const { config, state, setState } = useContext(LayoutContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current.topbarmenu.isSameNode(event.target) ||
                topbarRef.current.topbarmenu.contains(event.target) ||
                topbarRef.current.topbarmenubutton.isSameNode(event.target) ||
                topbarRef.current.topbarmenubutton.contains(event.target)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        }
    });

    const hideMenu = () => {
        setState((prevState) => ({ ...prevState, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setState((prevState) => ({ ...prevState, profileSidebarVisible: false }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = () => {
        DomHandler.addClass('blocked-scroll');
    };

    const unblockBodyScroll = () => {
        DomHandler.removeClass('blocked-scroll');
    };

    useEffect(() => {
        (state.overlayMenuActive || state.staticMenuMobileActive) && bindMenuOutsideClickListener();
        state.profileSidebarVisible && bindProfileMenuOutsideClickListener();
    }, [state.overlayMenuActive, state.staticMenuMobileActive, state.profileSidebarVisible]);

    useEffect(() => {
        state.staticMenuMobileActive && blockBodyScroll();
    }, [state.staticMenuMobileActive]);

    /*
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    */

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames('layout-wrapper', {
        'layout-theme-light': config.colorScheme === 'light',
        'layout-theme-dark': config.colorScheme === 'dark',
        'layout-overlay': config.menuMode === 'overlay',
        'layout-static': config.menuMode === 'static',
        'layout-slim': config.menuMode === 'slim',
        'layout-horizontal': config.menuMode === 'horizontal',
        'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
        'layout-overlay-active': state.overlayMenuActive,
        'layout-mobile-active': state.staticMenuMobileActive,
        'p-input-filled': config.inputStyle === 'filled',
        'p-ripple-disabled': !config.ripple
    });

    return (
        <ScrollToTop>
            <Head>
                <base href={contextPath}></base>
                <title>Sakai React with NextJS</title>
                <meta charSet="UTF-8" />
                <link rel="icon" href={`${contextPath}/favicon.ico`} type="image/x-icon"></link>
            </Head>

            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />

                <div ref={sidebarRef} className="layout-sidebar">
                    <AppMenu />
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">{props.children}</div>

                    <AppFooter />
                </div>

                <AppConfig />

                <div className="layout-mask"></div>
            </div>
        </ScrollToTop>
    );
};

export default Layout;
