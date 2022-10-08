import React from 'react';

const EmptyPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                </div>
            </div>
        </div>
    );
};

EmptyPage.getInitialProps = () => {
    return { isLayoutNeeded: true };
};

export default EmptyPage;