import getConfig from 'next/config';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { useContext } from 'react';
import { LayoutContext } from './layoutcontext';

export default function AppTopbar(props) {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const { onToggleMenuClick, layoutState, layoutConfig, onMobileTopbarMenuClick, onMobileSubTopbarMenuClick } = useContext(LayoutContext);
    return (
        <div className="layout-topbar">
            <Link href={'/'}>
                <a className="layout-topbar-logo">
                    <>
                        <img src={layoutState.layoutColorMode === 'light' ? `${contextPath}/layout/images/logo-dark.svg` : `${contextPath}/layout/images/logo-white.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
                        <span>SAKAI</span>
                    </>
                </a>
            </Link>

            <button ref={props.topbarRef} type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button ref={props.mobileTopbarRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames('layout-topbar-menu lg:flex origin-top', { 'layout-topbar-menu-mobile-active': layoutConfig.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
