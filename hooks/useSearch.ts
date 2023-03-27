import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useSearch = (query: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/search?query=${encodeURIComponent(query)}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSearch;