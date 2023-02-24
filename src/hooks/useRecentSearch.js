import { useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';

export const useRecentSearch = () => {
  const { createDocWithCustomID, documentExist } = useFirestore('search_users');

  const {
    updateDocument: updateRecentSearchDoc,
    getDocumentById: getRecentSearchDoc,
  } = useFirestore('recent_search');

  const { response } = useUserDataContext();

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
    [response.document.id, updateRecentSearchDoc]
  );

  return {
    getRecentSearch,
    addUserToRecentSearch,
    clearRecentSearch,
    removeUserFromRecentSearch,
  };
};
