import React from 'react';

const Error = ({ error }) => {
  return (
    <>
      <p>Sorry, there was an error! ${error.message}</p>
    </>
  );
};

export default Error;
