import React from "react";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../styles/demo/flags/flags.css";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import Layout from "../layout/layout";
import LayoutProvider from "../layout/layoutcontext";

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
