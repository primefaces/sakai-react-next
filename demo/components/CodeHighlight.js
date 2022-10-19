import React from 'react';

export function CodeHighlight(props) {
    return (
        <pre {...props} className="border-round surface-ground text-700 p-5">
            <code className="-mt-4 p-0 line-height-3 block">{props.children}</code>
        </pre>
    );
}
