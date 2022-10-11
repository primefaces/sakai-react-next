import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import Head from 'next/head';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import '../styles/demo/Demos.scss';
import '../styles/demo/flags/flags.css';
import '../styles/layout/layout.scss';
import '../styles/demo/components/components.style.css';

export default function MyApp({ Component, pageProps }) {
    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />);
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
}
