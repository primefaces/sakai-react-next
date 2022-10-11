import { useRouter } from 'next/router';
import Link from 'next/link';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';

const AppMenuitem = (props) => {
    const [active, setActive] = useState(false);
    const [key, setKey] = useState('');
    const { contextKey, routeEvent, onMenuStateChange } = useContext(MenuContext);
    const router = useRouter();

    let item = props.item;
    let root = props.root;

    /*useEffect(() => {
        setKey(props.parentKey ? props.parentKey + '-' + props.index : String(props.index));
        router.events.on('routeChangeStart', () => {
            if (item.routerLink) {
                updateActiveStateFromRoute();
            }
        });

        if (routeEvent) {
            setActive(contextKey === key || contextKey.startsWith(key + '-') ? true : false);
        } else {
            if (contextKey !== key && !contextKey.startsWith(key + '-')) {
                setActive(false);
            }
        }
    }, [router]);

    const updateActiveStateFromRoute = () => {
        let activeRoute = router.pathname === item.routerLink[0];

        if (activeRoute) {
            onMenuStateChange({ key: key, routeEvent: true });
        }
    };*/

    const itemClick = (event) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // toggle active state
        if (item.items) {
            setActive((prevState) => !prevState);
        }

        onMenuStateChange({ key: key });
    };

    const subMenu = item.items && item.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="p-toggleable-content" in={props.root ? true : active} unmountOnExit key={item.label}>
            <ul>
                {
                    item.items.map((child, i) => {
                        return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />
                    })
                }
            </ul>
        </CSSTransition>
    )

    return (
        <li className={classNames({'layout-root-menuitem': props.root, 'active-menuitem': active })}>
            {root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>}
            {(!item.routerLink || item.items) && item.visible !== false ? (
                <a href={item.url} onClick={(e) => itemClick(e)} className={item.class} target={item.target} tabIndex="0">
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </a>
            ) : null}

            {item.routerLink && !item.items && item.visible !== false ? (
                <Link href={item.routerLink} replace={item.replaceUrl} target={item.target}>
                    <a onClick={(e) => itemClick(e)} className={item.class} target={item.target} tabIndex="0">
                        <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                        <span className="layout-menuitem-text">{item.label}</span>
                        {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                        <Ripple />
                    </a>
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;
