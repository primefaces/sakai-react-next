import React from 'react';
import Link from 'next/link';

const EmptyPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                    <Link href="/pages/sample">Navigate</Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyPage;
