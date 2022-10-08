import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import '../styles/demo/Demos.scss';
import '../styles/demo/flags/flags.css';
import '../styles/layout/layout.scss';

export default function MyApp({ Component, pageProps }) {
    const LayoutComponent = pageProps.isLayoutNeeded ? Layout : React.Fragment;
    return (
        <LayoutProvider>
            <LayoutComponent>
                <Component {...pageProps} />
            </LayoutComponent>
        </LayoutProvider>
    );
}
