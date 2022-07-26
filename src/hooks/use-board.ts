import useSWR from "swr";

const url = process.env.NEXT_PUBLIC_HOST_OTHELLO_BACKEND + "/api/board";

const fetcher = (): Promise<any> => fetch(url).then((res) => res.json());

const emptyBoard = [...Array(64)];

const useBoard = () => {
  const { data, error } = useSWR(`/api/board`, fetcher);
  return {
    board: data?.board ?? emptyBoard,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBoard;
