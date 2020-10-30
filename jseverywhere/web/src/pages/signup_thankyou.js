import React, { useEffect } from 'react';

const signUpThankYou = () => {
  useEffect(() => {
    document.title = 'Thank you for signing up';
  });
  return (
    <div>
      <h1>Thank you for signing up!</h1>
      <p>
        We really appreciate your action to signup and hope you enjoy using the
        site.
      </p>
      <p>Yours sincerely,</p>
      <p>Oak Notes Dev Team</p>
    </div>
  );
};

export default signUpThankYou;
