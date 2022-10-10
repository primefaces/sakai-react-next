import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink } from '../demo/utils/navlink';

const AppMenuitem = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const itemClick = (event, item, index) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex) setActiveIndex(null);
        else setActiveIndex(index);

        if (props.itemClick) {
            props.itemClick({
                originalEvent: event,
                item: item
            });
        }

        // toggle active state
        if (item.items) {
            setActiveIndex((prevState) => !prevState);
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            event.target.click();
        }
    };

    const renderLinkContent = (item) => {
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>;

        return (
            <React.Fragment>
                <i className={classNames(item.icon, 'layout-menuitem-icon')}></i>
                <span className="layout-menuitem-text">{item.label}</span>
                {submenuIcon}
                <Ripple />
            </React.Fragment>
        );
    };

    const renderLink = (item, i) => {
        let content = renderLinkContent(item);

        if (item.routerLink) {
            return (
                <NavLink ariaLabel={item.label} onKeyDown={onKeyDown} role="menuitem" className="p-ripple" href={item.routerLink} onClick={(e) => itemClick(e, item, i)} exact>
                    {content}
                </NavLink>
            );
        } else {
            return (
                <a tabIndex="0" aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" href={item.url} className="p-ripple" onClick={(e) => itemClick(e, item, i)} rel="noreferrer">
                    {content}
                </a>
            );
        }
    };

    let items =
        props.items &&
        props.items.map((item, i) => {
            let active = activeIndex === i;
            let styleClass = classNames(item.badge, { 'layout-root-menuitem': props.root, 'active-menuitem': active });

            if (props.root) {
                return (
                    <li className={styleClass} key={i} role="none">
                        {props.root === true && (
                            <React.Fragment>
                                <div className="layout-menuitem-root-text" aria-label={item.label}>
                                    {item.label}
                                </div>
                                <AppMenuitem items={item.items} itemClick={props.itemClick} />
                            </React.Fragment>
                        )}
                    </li>
                );
            } else {
                return (
                    <li className={styleClass} key={i} role="none">
                        {renderLink(item, i)}
                        <CSSTransition classNames="layout-root-menuitem" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                            <AppMenuitem items={item.items} itemClick={props.itemClick} />
                        </CSSTransition>
                    </li>
                );
            }
        });

    return items ? props.root ? items : <ul>{items}</ul> : null;
};

export default AppMenuitem;
