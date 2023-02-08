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

  const getUsersIDs = async userList => {
    try {
      const userDocs = await Promise.all(
        userList.map(user => {
          return searchForUser(user);
        })
      );
      return userDocs;
    } catch (error) {}
  };

  const searchForUser = async searchTerm => {
    try {
      const bucketId = _determineBucket(searchTerm);
      const bucket = await getBucket(bucketId);
      if (!bucket) return null;
      return bucket.users[searchTerm];
    } catch (error) {
      throw error;
    }
  };

  return { addToBucket, removeFromBucket, searchForUser, getUsersIDs };
};
