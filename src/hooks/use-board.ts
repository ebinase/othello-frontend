import useSWR from "swr";

const url = process.env.NEXT_PUBLIC_HOST_OTHELLO_BACKEND + "/api/board";

const fetcher = (): Promise<any> => fetch(url).then((res) => res.json());

const useBoard = () => {
  const { data, error } = useSWR(`/api/board`, fetcher);
  return {
    board: data?.board,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBoard;
