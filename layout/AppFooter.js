import React, { useContext } from 'react';
import { LayoutContext } from './layoutcontext';
import getConfig from 'next/config';

export default function AppFooter() {
    const { layoutState } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">
            <img src={layoutState.layoutColorMode === 'light' ? `${contextPath}/layout/images/logo-dark.svg` : `${contextPath}/layout/images/logo-white.svg`} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">PrimeReact</span>
        </div>
    );
}
