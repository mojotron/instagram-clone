import { useState, useEffect } from 'react';
import { useSearchUsers } from './useSearchUsers';
import { useCollectDocsByIdList } from './useCollectDocsByIdList';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [recentSearch, setRecentSearch] = useState(null);
  const [modifyRecentSearch, setModifyRecentSearch] = useState(true);
  const { getAllUsersStartingWith, getRecentSearch } = useSearchUsers();
  // get docs
  const { documents: currentSearchDocs } = useCollectDocsByIdList(
    searchResults,
    'users'
  );
  const { documents: recentSearchDocs } = useCollectDocsByIdList(
    recentSearch,
    'users'
  );

  useEffect(() => {
    if (modifyRecentSearch === false) return;
    let isMounted = true;
    const loadRecentSearch = async () => {
      try {
        const data = await getRecentSearch();
        if (isMounted) {
          setRecentSearch(data.recentSearch);
          setModifyRecentSearch(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadRecentSearch();
    return () => {
      isMounted = false;
    };
  }, [getRecentSearch, modifyRecentSearch]);

  useEffect(() => {
    // debounce search call, call search one and half second after user
    // stops typing
    let isMounted = true;
    if (searchTerm === '') {
      if (isMounted) {
        setSearchResults(null);
      }
      return;
    }
    const debounce = setTimeout(async () => {
      const searchResults = await getAllUsersStartingWith(searchTerm);
      if (isMounted) {
        setSearchResults(searchResults);
      }
    }, 1500);

    return () => {
      clearTimeout(debounce);
      isMounted = false;
    };
  }, [searchTerm, getAllUsersStartingWith]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    recentSearch,
    currentSearchDocs,
    recentSearchDocs,
    setModifyRecentSearch,
  };
};
