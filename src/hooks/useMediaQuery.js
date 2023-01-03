import { useState, useEffect } from 'react';

export const useMediaQuery = mediaQuery => {
  const [isMatch, setIsMatch] = useState(false);
  const [matchMediaList, setMatchMediaList] = useState(null);

  const updateMedia = e => setIsMatch(e.matches);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMatchMediaList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEffect(() => {
    // The change event of the MediaQueryList interface fires when the status
    // of media query support changes.
    if (!matchMediaList) return;
    matchMediaList.addEventListener('change', updateMedia);

    return () => matchMediaList.removeEventListener('change', updateMedia);
  }, [matchMediaList]);

  return isMatch;
};
