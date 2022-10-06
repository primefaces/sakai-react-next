import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { LayoutContext } from '../context/layoutcontext';
import { classNames } from 'primereact/utils';
import PrimeReact from 'primereact/api';
import getConfig from 'next/config';

export default function AppConfig() {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { config, state, setConfig, showConfigSidebar, hideConfigSidebar } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const replaceLink = useCallback((linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }, []);

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    useEffect(() => {
        let themeElement = document.getElementById('theme-link');
        const themeHref = contextPath + '/themes/' + config.theme + '/theme.css';
        replaceLink(themeElement, themeHref);
    }, [config.theme, replaceLink]);

    useEffect(() => {
        document.documentElement.style.fontSize = config.scale + 'px';
    }, [config.scale]);

    const decrementScale = () => {
        setConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
    };

    const incrementScale = () => {
        setConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
    };
    const changeTheme = (e, theme, colorScheme) => {
        setConfig((prevState) => ({ ...prevState, colorScheme, theme }));
    };

    const changeInputStyle = (e) => {
        setConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e) => {
        PrimeReact.ripple = e.value;
        setConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };

    const changeMenuMode = (e) => {
        setConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    const onConfigButtonClick = () => {
        showConfigSidebar();
    };

    const onConfigSidebarHide = () => {
        hideConfigSidebar();
    };

    return (
        <>
            <Button className="layout-config-button p-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </Button>

            <Sidebar visible={state.configSidebarVisible} onHide={onConfigSidebarHide} position="right" transitionOptions=".3s cubic-bezier(0, 0, 0.2, 1)" className="layout-config-sidebar w-20rem">
                <h5>Scale</h5>
                <div className="flex align-items-center">
                    <Button icon="pi pi-minus" type="button" onClick={decrementScale} className="p-button-text p-button-rounded w-2rem h-2rem mr-2" disabled={config.scale === scales[0]}></Button>
                    <div className="flex gap-2 align-items-center">
                        {scales.map((item) => {
                            return <i className={classNames('pi pi-circle-fill', { 'text-primary-500': item === config.scale, 'text-300': item !== config.scale })} key={item}></i>;
                        })}
                    </div>
                    <Button icon="pi pi-plus" type="button" onClick={incrementScale} className="p-button-text p-button-rounded w-2rem h-2rem ml-2" disabled={config.scale === scales[scales.length - 1]}></Button>
                </div>
                <h5>Menu Type</h5>
                <div class="field-radiobutton">
                    <RadioButton name="menuMode" value={'static'} checked={config.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                    <label for="mode1">Static</label>
                </div>
                <div class="field-radiobutton">
                    <RadioButton name="menuMode" value={'overlay'} checked={config.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                    <label for="mode2">Overlay</label>
                </div>

                <h5>Input Style</h5>
                <div class="flex">
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value={'outlined'} checked={config.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></RadioButton>
                        <label for="outlined_input">Outlined</label>
                    </div>
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value={'filled'} checked={config.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                        <label for="filled_input">Filled</label>
                    </div>
                </div>

                <h5>Ripple Effect</h5>
                <InputSwitch checked={config.ripple} onChange={(e) => changeRipple(e)}></InputSwitch>
                <h5>Bootstrap</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'bootstrap4-light-blue', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/bootstrap4-light-blue.svg`} className="w-2rem h-2rem" alt="Bootstrap Light Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'bootstrap4-light-purple', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/bootstrap4-light-purple.svg`} className="w-2rem h-2rem" alt="Bootstrap Light Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'bootstrap4-dark-blue', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/bootstrap4-dark-blue.svg`} className="w-2rem h-2rem" alt="Bootstrap Dark Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'bootstrap4-dark-purple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/bootstrap4-dark-purple.svg`} className="w-2rem h-2rem" alt="Bootstrap Dark Purple" />
                        </button>
                    </div>
                </div>

                <h5>Material Design</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'md-light-indigo', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/md-light-indigo.svg`} className="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'md-light-deeppurple', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/md-light-deeppurple.svg`} className="w-2rem h-2rem" alt="Material Light DeepPurple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'md-dark-indigo', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/md-dark-indigo.svg`} className="w-2rem h-2rem" alt="Material Dark Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'md-dark-deeppurple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/md-dark-deeppurple.svg`} className="w-2rem h-2rem" alt="Material Dark DeepPurple" />
                        </button>
                    </div>
                </div>

                <h5>Material Design Compact</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'mdc-light-indigo', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/md-light-indigo.svg`} className="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'mdc-light-deeppurple', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/md-light-deeppurple.svg`} className="w-2rem h-2rem" alt="Material Light Deep Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'mdc-dark-indigo', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/md-dark-indigo.svg`} className="w-2rem h-2rem" alt="Material Dark Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'mdc-dark-deeppurple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/md-dark-deeppurple.svg`} className="w-2rem h-2rem" alt="Material Dark Deep Purple" />
                        </button>
                    </div>
                </div>

                <h5>Tailwind</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'tailwind-light', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/tailwind-light.png`} className="w-2rem h-2rem" alt="Tailwind Light" />
                        </button>
                    </div>
                </div>

                <h5>Fluent UI</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'fluent-light', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/fluent-light.png`} className="w-2rem h-2rem" alt="Fluent Light" />
                        </button>
                    </div>
                </div>

                <h5>PrimeOne Design - 2022</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-light-indigo', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/lara-light-indigo.png`} className="w-2rem h-2rem" alt="Lara Light Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-light-blue', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/lara-light-blue.png`} className="w-2rem h-2rem" alt="Lara Light Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-light-purple', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/lara-light-purple.png`} className="w-2rem h-2rem" alt="Lara Light Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-light-teal', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/lara-light-teal.png`} className="w-2rem h-2rem" alt="Lara Light Teal" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-dark-indigo', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/lara-dark-indigo.png`} className="w-2rem h-2rem" alt="Lara Dark Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-dark-blue', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/lara-dark-blue.png`} className="w-2rem h-2rem" alt="Lara Dark Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-dark-purple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/lara-dark-purple.png`} className="w-2rem h-2rem" alt="Lara Dark Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'lara-dark-teal', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/lara-dark-teal.png`} className="w-2rem h-2rem" alt="Lara Dark Teal" />
                        </button>
                    </div>
                </div>

                <h5>PrimeOne Design - 2021</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'saga-blue', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/saga-blue.png`} className="w-2rem h-2rem" alt="Saga Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'saga-green', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/saga-green.png`} className="w-2rem h-2rem" alt="Saga Green" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'saga-orange', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/saga-orange.png`} className="w-2rem h-2rem" alt="Saga Orange" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'saga-purple', 'light')}>
                            <img src={`${contextPath}/layout/images/themes/saga-purple.png`} className="w-2rem h-2rem" alt="Saga Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'vela-blue', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/vela-blue.png`} className="w-2rem h-2rem" alt="Vela Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'vela-green', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/vela-green.png`} className="w-2rem h-2rem" alt="Vela Green" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'vela-orange', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/vela-orange.png`} className="w-2rem h-2rem" alt="Vela Orange" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'vela-purple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/vela-purple.png`} className="w-2rem h-2rem" alt="Vela Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'arya-blue', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/arya-blue.png`} className="w-2rem h-2rem" alt="Arya Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'arya-green', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/arya-green.png`} className="w-2rem h-2rem" alt="Arya Green" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'arya-orange', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/arya-orange.png`} className="w-2rem h-2rem" alt="Arya Orange" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={(e) => changeTheme(e, 'arya-purple', 'dark')}>
                            <img src={`${contextPath}/layout/images/themes/arya-purple.png`} className="w-2rem h-2rem" alt="Arya Purple" />
                        </button>
                    </div>
                </div>
            </Sidebar>
        </>
    );
}
