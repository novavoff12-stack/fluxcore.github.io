import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePartners() {
  const { data, error } = useSWR<{ groupIds: number[] }>(
    "/api/partners",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    },
  );

  return {
    partnerIds: data?.groupIds ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
}
