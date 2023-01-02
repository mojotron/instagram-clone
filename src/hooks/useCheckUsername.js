import { projectFirestore } from '../firebase/config';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

export const useCheckUsername = () => {
  // check if username exist
  const publicUsernameExist = async username => {
    try {
      const usernameDocRef = await getDoc(
        doc(projectFirestore, `public_usernames/${username}`)
      );
      return usernameDocRef.exists();
    } catch (error) {
      throw error;
    }
  };

  // create username doc with custom id which is username
  const createPublicUsername = async username => {
    try {
      await setDoc(doc(projectFirestore, 'public_usernames', username), {
        userName: username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      throw error;
    }
  };

  return { publicUsernameExist, createPublicUsername };
};
