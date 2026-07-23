import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = ({ onLoadMore, loading, hasMore }) => {
  const sentinelRef = useRef(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (!('IntersectionObserver' in window)) {
      setShowLoadMore(true);
      return undefined;
    }

    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '240px 0px',
        threshold: 0.1,
      },
    );

    observer.observe(node);
    setShowLoadMore(false);

    return () => observer.disconnect();
  }, [loading, hasMore, onLoadMore]);

  return { sentinelRef, showLoadMore };
};

export default useInfiniteScroll;
