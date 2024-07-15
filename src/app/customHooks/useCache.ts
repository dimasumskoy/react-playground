import { useState, useEffect, useRef, useCallback } from "react";

interface CacheConfig {
  key: string;
  ttl: number;
}

interface CacheState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface CacheItem<T> {
  data: T | undefined;
  expiry: number;
}

function useCache<T>(fetcher: () => Promise<T>, config: CacheConfig) {
  const { key, ttl } = config;
  const [state, setState] = useState<CacheState<T>>({
    data: undefined,
    isLoading: false,
    error: null,
  });
  const cache = useRef<Record<string, CacheItem<T>>>({});
  const fetchPromiseRef = useRef<Promise<T> | null>(null);

  const refetch = useCallback(async () => {
    // if the same request was made, do nothing
    if (fetchPromiseRef.current) {
      return fetchPromiseRef.current;
    }

    // set current request and update cache
    fetchPromiseRef.current = fetcher()
      .then((data) => {
        cache.current[key] = {
          data,
          expiry: Date.now() + ttl,
        };
        return data;
      })
      .catch((error) => {
        console.log("Error in fetcher", error);
        throw error;
      });

    try {
      const data = await fetchPromiseRef.current;
      setState({
        data,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setState({
        data: undefined,
        isLoading: false,
        error: e as Error,
      });
    } finally {
      fetchPromiseRef.current = null;
    }
  }, [fetcher, key, ttl]);

  useEffect(() => {
    const cached = cache.current[key];
    if (cached && cached.data && Date.now() < cached.expiry) {
      setState({ data: cached.data, error: null, isLoading: false });
    } else {
      refetch();
    }

    const cleanup = () => {
      for (let key in cache.current) {
        if (cache.current[key].expiry > Date.now()) {
          delete cache.current[key];
        }
      }
    };

    cleanup();
    const intervalId = setInterval(cleanup, ttl);

    return () => clearInterval(intervalId);
  }, [key, ttl, refetch]);

  return state;
}

// Пример использования
// function UserProfile({ userId }: { userId: string }) {
//   const { data, isLoading, error } = useCache(
//     () => fetch(`/api/user/${userId}`).then(res => res.json()),
//     { key: `user-${userId}`, ttl: 5 * 60 * 1000 } // кэш на 5 минут
//   );

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   return <div>{data.name}</div>;
// }
