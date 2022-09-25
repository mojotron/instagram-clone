import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

export const usePasswordReset = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = async email => {
    setError(null);
    setIsPending(true);
    try {
      await sendPasswordResetEmail(projectAuth, email);
      alert('Password reset email sent!');
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, passwordReset };
};
