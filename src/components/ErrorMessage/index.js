import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div className="error-view">
      <h1>Something Went Wrong</h1>
      <p><strong>{props.error.message}</strong></p>
      <p>Maybe you lost internet connection or the endpoint is unavailable. Try refreshing the page</p>
    </div>
  );
};

export default ErrorMessage;