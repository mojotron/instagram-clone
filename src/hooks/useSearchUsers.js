import { useFirestore } from './useFirestore';

export const useSearchUsers = () => {
  const {
    getDocumentById,
    updateDocument,
    createDocWithCustomID,
    documentExist,
    deleteDocument,
  } = useFirestore('search_users');

  const _determineBucket = searchTerm => {
    const firstChar = searchTerm[0];
    const isLetter = /[a-z]/i.test(firstChar);
    return isLetter ? firstChar.toUpperCase() : firstChar;
  };

  const getBucket = async letter => {
    try {
      const docExist = await documentExist('search_users', letter);
      if (!docExist) return null;
      const document = await getDocumentById(letter);
      return document;
    } catch (error) {
      console.log(error);
    }
  };

  const addToBucket = async (username, userId) => {
    try {
      const bucketId = _determineBucket(username);
      const bucket = await getBucket(bucketId);
      if (bucket) {
        const updatedUsers = { ...bucket.users };
        updatedUsers[username] = userId;
        await updateDocument(bucketId, { users: updatedUsers });
      } else {
        const users = { [username]: userId };
        await createDocWithCustomID(bucketId, 'search_users', { users });
      }
    } catch (error) {
      throw error;
    }
  };

  const removeFromBucket = async username => {
    try {
      const bucketId = _determineBucket(username);
      const bucket = await getBucket(bucketId);
      const users = { ...bucket.users };
      delete users[username];
      if (Object.keys(users).length === 0) {
        await deleteDocument(bucketId);
      } else {
        await updateDocument(bucketId, { users });
      }
    } catch (error) {
      throw error;
    }
  };

  const getUsersIDs = async userList => {};

  const searchForUsers = searchTerm => {
    // get bucket
    // loop over users
    // collect ids
    // return ids
  };

  // const ref = collection(projectFirestore, 'users');
  // // TODO create in firebase list of all user for better preformance and refactor
  // const [isCanceled, setIsCanceled] = useState(false);
  // const [documents, setDocuments] = useState(null);
  // const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(null);

  // const searchForUsers = async searchTerm => {
  //   setIsPending(true);
  //   setError(null);
  //   try {
  //     const querySnapshot = await getDocs(ref);
  //     const result = [];
  //     querySnapshot.forEach(doc => {
  //       const data = doc.data();
  //       if (data.userName.startsWith(searchTerm)) {
  //         console.log(data.userName.startsWith(searchTerm));
  //         result.push({ ...data, id: doc.id });
  //       }
  //     });
  //     if (!isCanceled) {
  //       setIsPending(false);
  //       setDocuments(result);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     if (!isCanceled) {
  //       setIsPending(false);
  //       setError(error.message);
  //     }
  //   }
  // };

  // const reset = () => {
  //   setDocuments(null);
  //   setIsPending(false);
  //   setError(null);
  // };

  // useEffect(() => {
  //   return () => setIsCanceled(true);
  // }, []);

  return { addToBucket, removeFromBucket };
};
