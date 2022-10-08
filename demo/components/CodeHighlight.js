import { useMountEffect } from 'primereact/hooks';
import React, { useRef } from 'react';
import 'prismjs/themes/prism-coy.css';
export function CodeHighlight(props) {
    const codeElement = useRef();
    const languageClassName = `language-${props.lang || 'jsx'}`;

    useMountEffect(() => {
        import('prismjs').then((module) => {
            if (module) {
                module.highlightElement(codeElement.current);
            }
        });
    }, []);

    return (
        <div>
            <pre style={props.style}>
                <code ref={codeElement} className={languageClassName}>
                    {props.children}&nbsp;
                </code>
            </pre>
        </div>
    );
}
