import { useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';

export const useSearchUsers = () => {
  const {
    getDocumentById,
    updateDocument,
    createDocWithCustomID,
    documentExist,
    deleteDocument,
  } = useFirestore('search_users');

  const {
    updateDocument: updateRecentSearchDoc,
    getDocumentById: getRecentSearchDoc,
  } = useFirestore('recent_search');

  const { response } = useUserDataContext();

  const _determineBucket = useCallback(searchTerm => {
    const firstChar = searchTerm[0];
    const isLetter = /[a-z]/i.test(firstChar);
    return isLetter ? firstChar.toUpperCase() : firstChar;
  }, []);

  const getBucket = useCallback(
    async letter => {
      try {
        const docExist = await documentExist('search_users', letter);
        if (!docExist) return null;
        const document = await getDocumentById(letter);
        return document;
      } catch (error) {
        console.log(error);
      }
    },
    [documentExist, getDocumentById]
  );

  const addToBucket = useCallback(
    async (username, userId) => {
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
    },
    [createDocWithCustomID, getBucket, updateDocument, _determineBucket]
  );

  const removeFromBucket = useCallback(
    async username => {
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
    },
    [_determineBucket, deleteDocument, updateDocument, getBucket]
  );

  const searchForUser = useCallback(
    async searchTerm => {
      try {
        const bucketId = _determineBucket(searchTerm);
        const bucket = await getBucket(bucketId);
        if (!bucket) return null;
        return bucket.users[searchTerm];
      } catch (error) {
        throw error;
      }
    },
    [_determineBucket, getBucket]
  );

  const getAllUsersStartingWith = useCallback(
    async searchTerm => {
      try {
        const bucketId = _determineBucket(searchTerm);
        const bucket = await getBucket(bucketId);
        if (!bucket) return null;
        const matches = [];
        for (const [key, value] of Object.entries(bucket.users)) {
          if (key.toString().startsWith(searchTerm)) matches.push(value);
        }
        return matches;
      } catch (error) {
        throw error;
      }
    },
    [_determineBucket, getBucket]
  );

  const getUsersIDs = useCallback(
    async userList => {
      try {
        const userDocs = await Promise.all(
          userList.map(user => {
            return searchForUser(user);
          })
        );
        return userDocs;
      } catch (error) {
        throw error;
      }
    },
    [searchForUser]
  );

  // recent search
  const getRecentSearch = useCallback(async () => {
    try {
      const docExist = await documentExist(
        'recent_search',
        response.document.id
      );
      if (!docExist) return null;
      const doc = await getRecentSearchDoc(response.document.id);
      return doc;
    } catch (error) {
      throw error;
    }
  }, [documentExist, getRecentSearchDoc, response.document.id]);

  const addUserToRecentSearch = useCallback(
    async (searchedUserId, recentSearchList) => {
      try {
        if (recentSearchList) {
          if (recentSearchList.includes(searchedUserId)) return;
          const updatedRecentSearch = [...recentSearchList, searchedUserId];
          await updateRecentSearchDoc(response.document.id, {
            recentSearch: updatedRecentSearch,
          });
        } else {
          await createDocWithCustomID(response.document.id, 'recent_search', {
            recentSearch: [searchedUserId],
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [createDocWithCustomID, updateRecentSearchDoc, response.document.id]
  );

  const clearRecentSearch = useCallback(async () => {
    try {
      await updateRecentSearchDoc(response.document.id, { recentSearch: [] });
    } catch (error) {
      throw error;
    }
  }, [updateRecentSearchDoc, response.document.id]);

  const removeUserFromRecentSearch = useCallback(
    async (userDocId, recentSearchList) => {
      try {
        const updatedRecentSearch = recentSearchList.filter(
          docId => docId !== userDocId
        );
        await updateRecentSearchDoc(response.document.id, {
          recentSearch: updatedRecentSearch,
        });
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return {
    addToBucket,
    removeFromBucket,
    searchForUser,
    getUsersIDs,
    getAllUsersStartingWith,
    // recent search
    getRecentSearch,
    addUserToRecentSearch,
    clearRecentSearch,
    removeUserFromRecentSearch,
  };
};
