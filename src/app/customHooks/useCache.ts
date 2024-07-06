import { useState, useEffect } from 'react';

interface CacheConfig {
  key: string;
  ttl: number; // время жизни кэша в миллисекундах
}

function useCache<T>(fetcher: () => Promise<T>, config: CacheConfig) {
  // Реализуйте хук для кэширования данных
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
