import React from 'react';

const ErrorPage = () => {
    // const message = location.state?.message || "Something went wrong.";

    return (
        <div>
            <h1>Error</h1>
            <p>"Something went wrong."</p>
            <a href="/">Go Back to Home</a>
        </div>
    );
};

export default ErrorPage;
